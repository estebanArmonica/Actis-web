import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { Topbar } from '../../components/topbar/topbar';
import { Footer } from "../../components/footer/footer";
import { NavbarBreadcrumb } from "../../components/navbar-breadcrumb/navbar-breadcrumb";
import { Router } from '@angular/router';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { MailerSend } from '../../services/mailer-send/mailer-send';
import { ContactFormData } from '../../interfaces/mailer-send.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  imports: [Topbar, Footer, NavbarBreadcrumb, CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto implements OnInit {
  // variables privadas
  private fb = inject(FormBuilder);
  private mailerSendService = inject(MailerSend);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  contactForm: FormGroup;
  loading = false;
  submitted = false;

  constructor() {
    this.contactForm = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
      ]],
      asunto: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
      mensaje: ['', [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(2000)
      ]]
    });
  }

  ngOnInit(): void {
    // Scroll al formulario si hay error
    this.contactForm.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(status => {
        if (status === 'INVALID' && this.submitted) {
          this.scrollToForm();
        }
      });
  }

  onSubmit(): void {
    this.submitted = true;

    // Marcar todos los campos como touched para mostrar errores
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });

    if (this.contactForm.invalid) {
      this.showValidationError();
      return;
    }

    this.loading = true;
    const formData: ContactFormData = this.contactForm.value;

    // Enviar email al administrador
    this.mailerSendService.sendContactEmail(formData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          // Enviar confirmación al usuario
          this.mailerSendService.sendConfirmationToUser(formData)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: () => {
                this.showSuccess();
                this.resetForm();
              },
              error: (error) => {
                console.warn('Error enviando confirmación:', error);
                // Aún mostramos éxito si el email principal se envió
                this.showSuccess();
                this.resetForm();
              }
            });
        },
        error: (error) => {
          console.error('Error enviando email:', error);
          this.handleError(error);
        }
      });
  }

  private resetForm(): void {
    this.contactForm.reset();
    this.submitted = false;
    this.loading = false;
    
    // Resetear estado de los controles
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsUntouched();
      control?.markAsPristine();
    });
  }

  private showSuccess(): void {
    Swal.fire({
      icon: 'success',
      title: '¡Mensaje enviado con éxito!',
      html: `
        <div style="text-align: left;">
          <p>✅ Hemos recibido tu mensaje correctamente.</p>
          <p>📧 Te hemos enviado un email de confirmación.</p>
          <p>⏰ Nos pondremos en contacto contigo en un plazo máximo de <strong>24 horas hábiles</strong>.</p>
          <hr>
          <p style="font-size: 14px; color: #666;">
            <strong>Referencia:</strong> TS-${Date.now().toString().slice(-8)}<br>
            <strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}
          </p>
        </div>
      `,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/']);
      }
    });
  }

  private showValidationError(): void {
    Swal.fire({
      icon: 'error',
      title: 'Formulario incompleto',
      text: 'Por favor, completa todos los campos correctamente.',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Corregir',
      allowOutsideClick: false
    }).then(() => {
      this.scrollToForm();
    });
  }

  private handleError(error: any): void {
    this.loading = false;
    
    let errorMessage = 'Hubo un problema al enviar el mensaje. Por favor, inténtalo nuevamente.';
    
    if (error.status === 401) {
      errorMessage = 'Error de autenticación. Por favor, contacta al administrador.';
    } else if (error.status === 429) {
      errorMessage = 'Demasiados intentos. Por favor, espera unos minutos antes de intentar nuevamente.';
    } else if (error.status >= 500) {
      errorMessage = 'Error del servidor. Por favor, intenta más tarde.';
    }

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Entendido',
      footer: '<small>Si el problema persiste, contacta a: info@techsolutions.com</small>'
    });
  }

  private scrollToForm(): void {
    const formElement = document.querySelector('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  private mostrarExito(): void {
    Swal.fire({
      icon: 'success',
      title: '¡Mensaje enviado!',
      text: 'Nos pondremos en contacto contigo pronto.',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
      timer: 3000,
      timerProgressBar: true
    });
  }

  private mostrarError(mensaje: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Entendido'
    });
    this.loading = false;
  }

  // Getters para acceso fácil a los controles
  get nombre() { return this.contactForm.get('nombre'); }
  get email() { return this.contactForm.get('email'); }
  get asunto() { return this.contactForm.get('asunto'); }
  get mensaje() { return this.contactForm.get('mensaje'); }

  // Métodos auxiliares para la plantilla
  hasError(controlName: string, errorType: string): boolean {
    const control = this.contactForm.get(controlName);
    return control ? control.hasError(errorType) && (control.touched || this.submitted) : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);
    
    if (!control || !control.errors) return '';
    
    if (control.errors['required']) {
      return 'Este campo es requerido';
    }
    
    if (control.errors['email'] || control.errors['pattern']) {
      return 'Ingresa un email válido';
    }
    
    if (control.errors['minlength']) {
      const requiredLength = control.errors['minlength'].requiredLength;
      return `Mínimo ${requiredLength} caracteres`;
    }
    
    if (control.errors['maxlength']) {
      const requiredLength = control.errors['maxlength'].requiredLength;
      return `Máximo ${requiredLength} caracteres`;
    }
    
    if (control.errors['pattern']) {
      if (controlName === 'nombre') {
        return 'Solo se permiten letras y espacios';
      }
    }
    
    return 'Campo inválido';
  }
}
