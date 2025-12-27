import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { Particle } from '../../interfaces/Particles';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class Navbar implements OnInit {
  
  isScrolled = false;
  isMenuOpen = false;
  
  particles: Particle[] = [];

  // Textos dinámicos para el efecto typing
  services = ['Infraestructura IT', 'Ciberseguridad', 'Desarrollo Web', 'Soporte Técnico', 'Cloud Computing'];
  currentServiceIndex = 0;
  currentText = '';
  isDeleting = false;
  typingSpeed = 100;
  
  // Contadores animados
  counters = [
    { label: 'Clientes', value: 0, target: 250, suffix: '+' },
    { label: 'Proyectos', value: 0, target: 500, suffix: '+' },
    { label: 'Expertos', value: 0, target: 50, suffix: '+' },
    { label: 'Soporte', value: 0, target: 24, suffix: '/7' }
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  ngOnInit() {
    this.onWindowScroll();
    this.startTypingEffect();
    this.startCounters();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  startTypingEffect() {
    const type = () => {
      const currentService = this.services[this.currentServiceIndex];
      
      if (this.isDeleting) {
        // Borrando
        this.currentText = currentService.substring(0, this.currentText.length - 1);
        this.typingSpeed = 50;
      } else {
        // Escribiendo
        this.currentText = currentService.substring(0, this.currentText.length + 1);
        this.typingSpeed = 100;
      }
      
      // Cambiar entre escribir y borrar
      if (!this.isDeleting && this.currentText === currentService) {
        // Pausa al terminar de escribir
        this.typingSpeed = 1500;
        this.isDeleting = true;
      } else if (this.isDeleting && this.currentText === '') {
        // Cambiar al siguiente servicio
        this.isDeleting = false;
        this.currentServiceIndex = (this.currentServiceIndex + 1) % this.services.length;
        this.typingSpeed = 500;
      }
      
      setTimeout(type, this.typingSpeed);
    };
    
    setTimeout(type, 1000);
  }

  startCounters() {
    setTimeout(() => {
      this.counters.forEach(counter => {
        this.animateCounter(counter);
      });
    }, 1500);
  }

  animateCounter(counter: any) {
    const duration = 2000;
    const steps = 60;
    const increment = counter.target / steps;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      counter.value = Math.min(Math.round(increment * currentStep), counter.target);
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);
  }
}
