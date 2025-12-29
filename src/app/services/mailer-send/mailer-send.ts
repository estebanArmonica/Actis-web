import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MailerSendEmail, MailerSendResponse, ContactFormData } from '../../interfaces/mailer-send.model';

@Injectable({
  providedIn: 'root',
})
export class MailerSend {
  private http = inject(HttpClient);
  private apiUrl = environment.mailerSend.apiUrl;
  private apiKey = environment.mailerSend.apiKey;
  private defaultFrom = environment.mailerSend.defaultFrom;
  private defaultTo = environment.mailerSend.defaultTo;

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });
  }

  /**
   * Envía un email usando la API de MailerSend
   */
  sendEmail(emailData: MailerSendEmail): Observable<MailerSendResponse> {
    const url = `${this.apiUrl}/email`;

    return this.http.post<MailerSendResponse>(url, emailData, {
      headers: this.getHeaders()
    });
  }

  /**
   * Envía un email de contacto desde el formulario
   */
  sendContactEmail(contactData: ContactFormData): Observable<MailerSendResponse> {
    const emailData: MailerSendEmail = {
      from: this.defaultFrom,
      to: [{
        email: this.defaultTo,
        name: 'Administrador'
      }],
      subject: `Nuevo contacto: ${contactData.asunto}`,
      html: this.generateContactHtml(contactData),
      text: this.generateContactText(contactData)
    };

    return this.sendEmail(emailData);
  }

  /**
   * Envía una copia al usuario que contacta
   */
  sendConfirmationToUser(contactData: ContactFormData): Observable<MailerSendResponse> {
    const emailData: MailerSendEmail = {
      from: this.defaultFrom,
      to: [{
        email: contactData.email,
        name: contactData.nombre
      }],
      subject: 'Confirmación de contacto - TechSolutions',
      html: this.generateConfirmationHtml(contactData),
      text: this.generateConfirmationText(contactData)
    };

    return this.sendEmail(emailData);
  }

  /**
   * Genera HTML para el email de contacto
   */
  private generateContactHtml(contactData: ContactFormData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nuevo Contacto</title>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
              .info-item { margin-bottom: 15px; }
              .label { font-weight: bold; color: #667eea; }
              .message-box { background: white; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #777; font-size: 12px; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>📨 Nuevo Mensaje de Contacto</h1>
                  <p>TechSolutions Website</p>
              </div>
              <div class="content">
                  <div class="info-item">
                      <span class="label">👤 Nombre:</span> ${contactData.nombre}
                  </div>
                  <div class="info-item">
                      <span class="label">📧 Email:</span> ${contactData.email}
                  </div>
                  <div class="info-item">
                      <span class="label">📋 Asunto:</span> ${contactData.asunto}
                  </div>
                  <div class="info-item">
                      <span class="label">📅 Fecha:</span> ${new Date().toLocaleString('es-ES')}
                  </div>
                  <div class="message-box">
                      <h3>📝 Mensaje:</h3>
                      <p>${contactData.mensaje.replace(/\n/g, '<br>')}</p>
                  </div>
                  <p><strong>⚠️ Acción requerida:</strong> Por favor, responde a este mensaje en un plazo máximo de 24 horas.</p>
              </div>
              <div class="footer">
                  <p>Este mensaje fue enviado desde el formulario de contacto de TechSolutions.</p>
                  <p>© ${new Date().getFullYear()} TechSolutions. Todos los derechos reservados.</p>
              </div>
          </div>
      </body>
      </html>
    `;
  }

  /**
   * Genera texto plano para el email de contacto
   */
  private generateContactText(contactData: ContactFormData): string {
    return `
            NUEVO MENSAJE DE CONTACTO - TechSolutions
            ==========================================

            📋 INFORMACIÓN DEL CONTACTO:
            -----------------------------
            👤 Nombre: ${contactData.nombre}
            📧 Email: ${contactData.email}
            📋 Asunto: ${contactData.asunto}
            📅 Fecha: ${new Date().toLocaleString('es-ES')}

            📝 MENSAJE:
            -----------
            ${contactData.mensaje}

            ⚠️ ACCIÓN REQUERIDA:
            -------------------
            Por favor, responde a este mensaje en un plazo máximo de 24 horas.

            --
            Este mensaje fue enviado desde el formulario de contacto de TechSolutions.
            © ${new Date().getFullYear()} TechSolutions. Todos los derechos reservados.
    `;
  }

  /**
   * Genera HTML para la confirmación al usuario
   */
  private generateConfirmationHtml(contactData: ContactFormData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmación de Contacto</title>
          <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; }
              .content { padding: 40px 30px; }
              .greeting { font-size: 18px; margin-bottom: 30px; }
              .summary { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 25px 0; border-left: 4px solid #667eea; }
              .info-row { margin-bottom: 12px; }
              .label { font-weight: 600; color: #495057; display: inline-block; width: 80px; }
              .message-box { background: #e9ecef; padding: 20px; border-radius: 6px; margin: 25px 0; font-style: italic; }
              .next-steps { background: #e7f5ff; border: 1px solid #a5d8ff; border-radius: 8px; padding: 20px; margin: 25px 0; }
              .footer { text-align: center; padding: 30px 20px; background: #f8f9fa; color: #6c757d; font-size: 14px; border-top: 1px solid #dee2e6; }
              .logo { font-size: 24px; font-weight: bold; color: #667eea; margin-bottom: 10px; }
              .social-links a { margin: 0 10px; color: #667eea; text-decoration: none; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>✅ ¡Mensaje Recibido!</h1>
                  <p>Gracias por contactar con TechSolutions</p>
              </div>
              
              <div class="content">
                  <div class="greeting">
                      <p>Hola <strong>${contactData.nombre}</strong>,</p>
                      <p>Hemos recibido tu mensaje correctamente. Nos pondremos en contacto contigo pronto.</p>
                  </div>
                  
                  <div class="summary">
                      <h3>📋 Resumen de tu consulta:</h3>
                      <div class="info-row">
                          <span class="label">Asunto:</span> ${contactData.asunto}
                      </div>
                      <div class="info-row">
                          <span class="label">Fecha:</span> ${new Date().toLocaleString('es-ES')}
                      </div>
                      <div class="info-row">
                          <span class="label">Referencia:</span> TS-${Date.now().toString().slice(-8)}
                      </div>
                  </div>
                  
                  <div class="message-box">
                      <h4>📝 Tu mensaje:</h4>
                      <p>${contactData.mensaje.replace(/\n/g, '<br>')}</p>
                  </div>
                  
                  <div class="next-steps">
                      <h4>🔄 ¿Qué sigue?</h4>
                      <ul>
                          <li>Revisaremos tu consulta en detalle</li>
                          <li>Te contactaremos en un plazo máximo de <strong>24 horas hábiles</strong></li>
                          <li>Recibirás una propuesta personalizada según tus necesidades</li>
                      </ul>
                  </div>
                  
                  <p style="text-align: center; margin-top: 30px;">
                      <strong>📧 ¿Necesitas contactarnos urgentemente?</strong><br>
                      Puedes responder a este correo o llamarnos al: <strong>+51 987 654 321</strong>
                  </p>
              </div>
              
              <div class="footer">
                  <div class="logo">TechSolutions</div>
                  <p>Especialistas en Tecnología e Innovación</p>
                  <div class="social-links" style="margin: 20px 0;">
                      <a href="#">🌐 Web</a> | 
                      <a href="#">💼 LinkedIn</a> | 
                      <a href="#">🐦 Twitter</a>
                  </div>
                  <p>
                      Av. Principal 123, Lima, Perú<br>
                      Tel: +51 987 654 321 | Email: info@techsolutions.com
                  </p>
                  <p style="font-size: 12px; margin-top: 20px; color: #868e96;">
                      Este es un mensaje automático. Por favor, no respondas a este correo.<br>
                      © ${new Date().getFullYear()} TechSolutions. Todos los derechos reservados.
                  </p>
              </div>
          </div>
      </body>
      </html>
    `;
  }

  /**
   * Genera texto plano para la confirmación
   */
  private generateConfirmationText(contactData: ContactFormData): string {
    return `
            CONFIRMACIÓN DE CONTACTO - TechSolutions
            =========================================

            Hola ${contactData.nombre},

            ✅ Hemos recibido tu mensaje correctamente. Nos pondremos en contacto contigo pronto.

            📋 RESUMEN DE TU CONSULTA:
            --------------------------
            Asunto: ${contactData.asunto}
            Fecha: ${new Date().toLocaleString('es-ES')}
            Referencia: TS-${Date.now().toString().slice(-8)}

            📝 TU MENSAJE:
            --------------
            ${contactData.mensaje}

            🔄 ¿QUÉ SIGUE?
            --------------
            1. Revisaremos tu consulta en detalle
            2. Te contactaremos en un plazo máximo de 24 horas hábiles
            3. Recibirás una propuesta personalizada según tus necesidades

            📧 CONTACTO URGENTE:
            --------------------
            Puedes responder a este correo o llamarnos al: +51 987 654 321

            ---
            TechSolutions
            Especialistas en Tecnología e Innovación
            Av. Principal 123, Lima, Perú
            Tel: +51 987 654 321 | Email: info@techsolutions.com

            Este es un mensaje automático. Por favor, no respondas a este correo.
            © ${new Date().getFullYear()} TechSolutions. Todos los derechos reservados.
    `;
  }
}
