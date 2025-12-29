import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CountUp } from 'countup.js';

import Swiper from 'swiper';

@Component({
  selector: 'app-cliente-proyectos',
  imports: [CommonModule, RouterModule],
  templateUrl: './cliente-proyectos.html',
  styleUrl: './cliente-proyectos.css',
  standalone: true
})
export class ClienteProyectos implements OnInit, AfterViewInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  categories: string[] = ['Todos', 'Tecnología', 'Cloud Computing', 'Infraestructura', 'Base de Datos', 'Consultoría'];
  selectedCategory = 'Todos';

  counters: any = {
    clients: null,
    retention: null,
    months: null,
    rating: null
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.loadClients();
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAnimations();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeCarousel();
      this.initializeCounters();
    }
  }

  private loadClients(): void {
    this.clients = [
      {
        id: 1,
        name: 'S.I.I',
        logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQGHdJRCVWthfw/company-logo_200_200/company-logo_200_200/0/1631308786993?e=2147483647&v=beta&t=l9-P8cVpsz9_K6pXZBYjjtB3kNO73Swn4Vp9Gnu7dac',
        category: 'Tecnología',
        duration: '3+ años',
        description: 'Infraestructura Cloud & Soporte Azure',
        testimonial: 'Excelente servicio de migración a la nube.'
      },
      {
        id: 2,
        name: 'Universidad de chile',
        logo: 'https://www.learnchile.cl/wp-content/uploads/2021/08/escudo-uchile-vertical-color-fondo-transp.jpg',
        category: 'Cloud Computing',
        duration: '2+ años',
        description: 'Soluciones GCP & Kubernetes',
        testimonial: 'Soporte técnico excepcional 24/7.'
      },
      {
        id: 3,
        name: 'IPS',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFfnTRLopclYXjH2ufU8dzvQkCAsmOq-FnEw&s',
        category: 'Infraestructura',
        duration: '4+ años',
        description: 'Arquitectura Serverless & DevOps',
        testimonial: 'Optimización de costos en AWS.'
      },
      {
        id: 4,
        name: 'Ministerio de Cultura',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Logo_del_Ministerio_de_las_Culturas%2C_las_Artes_y_el_Patrimonio_de_Chile.png',
        category: 'Base de Datos',
        duration: '5+ años',
        description: 'Administración Oracle DB & Performance',
        testimonial: 'Solución de problemas complejos eficiente.'
      },
      {
        id: 5,
        name: 'Ministerio de Desarrollo Social y Familia',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Logo_del_Ministerio_de_Desarrollo_Social_y_Familia_de_Chile.png',
        category: 'Consultoría IT',
        duration: '3+ años',
        description: 'Transformación Digital & AI',
        testimonial: 'Implementación de IA exitosa.'
      },
      {
        id: 6,
        name: 'CONAF',
        logo: 'https://sustentable.cl/wp-content/uploads/2025/07/logo_conaf.jpg',
        category: 'ERP Solutions',
        duration: '2+ años',
        description: 'Integración SAP & Custom Development',
        testimonial: 'Soporte técnico especializado.'
      }
    ];

    this.filteredClients = [...this.clients];
  }

  filterClients(category: string): void {
    this.selectedCategory = category;
    if (category === 'Todos') {
      this.filteredClients = [...this.clients];
    } else {
      this.filteredClients = this.clients.filter(client => client.category === category);
    }
  }

  private initializeCounters(): void {
    const statsSection = document.querySelector('.client-stats');
    if (!statsSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
  }

  private initializeAnimations(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-card');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.client-card').forEach(card => {
      observer.observe(card);
    });
  }

  private initializeCarousel(): void {
    if (typeof Swiper !== 'undefined') {
      new Swiper('.clientsSwiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          }
        }
      });
    }
  }

  private startCounters(): void {
    // Configuración de los contadores
    const options = {
      duration: 2,
      separator: '',
      decimal: '.',
      decimalPlaces: 1
    };

    // Contador de clientes
    if (!this.counters.clients) {
      this.counters.clients = new CountUp('client-counter', 150, options);
      this.counters.clients.start();
    }

    // Contador de retención
    if (!this.counters.retention) {
      this.counters.retention = new CountUp('retention-counter', 98, options);
      this.counters.retention.start();
    }

    // Contador de meses
    if (!this.counters.months) {
      this.counters.months = new CountUp('months-counter', 24, options);
      this.counters.months.start();
    }

    // Contador de rating
    if (!this.counters.rating) {
      const ratingOptions = { ...options, decimalPlaces: 1 };
      this.counters.rating = new CountUp('rating-counter', 4.9, ratingOptions);
      this.counters.rating.start();
    }
  }
}
