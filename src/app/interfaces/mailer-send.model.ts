export interface MailerSendEmail {
  from: EmailRecipient;
  to: EmailRecipient[];
  subject: string;
  text?: string;
  html?: string;
  template_id?: string;
  variables?: Variable[];
  personalization?: Personalization[];
}

export interface EmailRecipient {
  email: string;
  name?: string;
}

export interface Variable {
  email: string;
  substitutions: Substitution[];
}

export interface Substitution {
  var: string;
  value: string;
}

export interface Personalization {
  email: string;
  data: PersonalizationData;
}

export interface PersonalizationData {
  [key: string]: string | number | boolean;
}

export interface MailerSendResponse {
  message_id: string;
}

export interface ContactFormData {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}