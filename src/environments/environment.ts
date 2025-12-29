export const environment = {
  production: false,
  mailerSend: {
    apiKey: 'mlsn.4e37340b21119ede354965bc091e89773482db6f4caa42bb81b4eb80429b9487',
    apiUrl: 'https://api.mailersend.com/v1',
    defaultFrom: {
      email: 'contacto@tu-dominio.com',
      name: 'TechSolutions Contacto'
    },
    defaultTo: 'tucorreo@dominio.com' // Este ultimo se reemplaza con el email correspondiente
  }
};