# Etapa 1: Construir la aplicación Angular
FROM node:20-alpine AS build

# Instalamos las dependencias del sistema necesarias
RUN apk add --no-cache python3 make g++ git

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de configuración de dependencias
COPY package*.json ./

# Instalamos las dependencias con limpieza de cache
RUN npm ci --only=production --ignore-scripts && \
    npm cache clean --force

# Copiamos todo el código fuente
COPY . .

# Instalamos las dependencias de desarrollo para el build
RUN npm install --only=development

# Construimos la aplicación en modo producción
RUN npm run build -- --configuration production

# Eliminamos las dependencias de desarrollo para reducir tamaño
RUN npm prune --production

# =======================================================================================

# Etapa 2: Runtime - Servir la aplicación
FROM nginx:1.25-alpine

# Instalamos las herramientas para debugging (no es necesario esto, pero lo deje para tener un log y ver como se levanta el contenedor)
RUN apk add --no-cache curl

# Copiamos la configuración personalizada de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiamos una vez los archivos construidos desde la etapa de builder
COPY --from=builder /app/dist/*/browser /usr/share/nginx/html

# Creamos un usuario no-root para mayor seguridad
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Nos cambiamos ahora al usuario no-root que hemos creado
USER nginx

# Exponer puerto (en palabras simples, es en donde correrá, hablara, escuchará la pagina web)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1

# Comando para ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]