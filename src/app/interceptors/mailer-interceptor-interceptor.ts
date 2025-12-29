import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export const mailerInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // Solo interceptar requests a MailerSend
  if (!req.url.includes('mailersend.com')) {
    return next(req);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Log de error
      console.error('MailerSend API Error:', {
        url: req.url,
        status: error.status,
        message: error.message,
        timestamp: new Date().toISOString()
      });

      // Re-lanzar el error para que el componente lo maneje
      return throwError(() => error);
    })
  );
};
