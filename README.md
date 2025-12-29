
# Web ACTIS

Este proyecto es una nueva imagen del diseño de la página existente de ACTIS, el cual tiene el fin de dar una nueva imagen para acercar a diferentes y potenciales clientes para desarrollador proyectos junto con ACTIS.

Este proyecto usa principalmente el lenguaje de Angular y TypeScripts:

- [ ]  Node.js 20.19.6 [Descargar Version](https://angular.dev/events/v21)

- [ ]  Angular 21 [Ir a la documentación](https://nodejs.org/en/download/current)

- [ ]  Visual Studio Code [Descargar](https://code.visualstudio.com/download)

- [ ]  Bootstrap [Ir a Bootstrap](https://getbootstrap.com/)

- [ ]  EmailJS [Ver API](https://www.mailersend.com/features/email-api?source=google&medium=cpc&campaign=MS_LATAM_gen%20-%20Email%20Features&content=Gen%20-%20Email%20API&term=javascript%20email%20api&ml_campaignid=12186006468&ml_adsetid=170722865246&gad_source=1&gad_campaignid=12186006468&gclid=Cj0KCQiAx8PKBhD1ARIsAKsmGbciG4a7pw2A4E3Au5xnCR5x7tQXPxC7GQ9HXWRB637tLF7JUY0rDUkaArDJEALw_wcB)


## Variables de Entorno

Para correr este proyecto se necesito de un archivo `.env` donde en este se encuentra las variables para eviar correos a travéz del formulario de contacto:

`MAILERSEND_API_KEY=YOUR_API_KEY`
`MAILERSEND_FROM_EMAIL=CONTACTO@DOMINIO.CL`
`MAILERSEND_FROM_NAME=NOMBRE_SEND_MAILER`
`MAILERSEND_TO_EMAIL=CORREO_DOMINIO`

Toda la información se encuentra usando la página de EmailJS, donde se deben crear las correspondiente variables [ir a la documentacion](https://www.mailersend.com/features/email-api?source=google&medium=cpc&campaign=MS_LATAM_gen%20-%20Email%20Features&content=Gen%20-%20Email%20API&term=javascript%20email%20api&ml_campaignid=12186006468&ml_adsetid=170722865246&gad_source=1&gad_campaignid=12186006468&gclid=Cj0KCQiAx8PKBhD1ARIsAKsmGbciG4a7pw2A4E3Au5xnCR5x7tQXPxC7GQ9HXWRB637tLF7JUY0rDUkaArDJEALw_wcB)


## Correr el proyecto

Para levantar el proyecto en entorno de pruebas debe seguir los siguientes comandos

```bash
  # descargar el github
  git clone https://github.com/estebanArmonica/Actis-web.git

  # crear el archivo .env con las variables de entorno
   MAILERSEND_API_KEY=YOUR_API_KEY
   MAILERSEND_FROM_EMAIL=CONTACTO@DOMINIO.CL
   MAILERSEND_FROM_NAME=NOMBRE_SEND_MAILER
   MAILERSEND_TO_EMAIL=CORREO_DOMINIO

   # levantamos el proyecto 
   ng serve

   y listo se mostrara en terminal el url "http://localhost:4200"
```

Para correr de forma producción es lo siguiente
```bash
  # descargar el github
  git clone https://github.com/estebanArmonica/Actis-web.git

  # crear el archivo .env con las variables de entorno
   MAILERSEND_API_KEY=YOUR_API_KEY
   MAILERSEND_FROM_EMAIL=CONTACTO@DOMINIO.CL
   MAILERSEND_FROM_NAME=NOMBRE_SEND_MAILER
   MAILERSEND_TO_EMAIL=CORREO_DOMINIO

   # levantamos el proyecto usando docker
   docker build -t mi-app-node .

   # ejecutamos la imagen para probar que se puede levantar sin errores
   docker run -p 8080:3000 -d mi-app-node

   y listo si todo sale bien, solo se debe levantar en alguna arquitectora cloud la imagen de docker
```
