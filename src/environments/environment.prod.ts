export const environment = {
  production: true,
  mailerSend: {
    apiKey: 'TU_API_KEY_PROD', // Usar una diferente para producción
    apiUrl: 'https://api.mailersend.com/v1',
    defaultFrom: {
      email: 'contacto@tu-dominio.com',
      name: 'TechSolutions Contacto'
    },
    defaultTo: 'tucorreo@dominio.com'
  }
};