import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar-breadcrumb',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-breadcrumb.html',
  styleUrl: './navbar-breadcrumb.css',
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class NavbarBreadcrumb {
  // Estado del navbar
  isScrolled = false;
  isMenuOpen = false;
  isMobileDropdownOpen = false;
  showTopbar = true;
  
  // Texto para typing effect
  typingTexts: string[] = [
    'Empresa',
    'Productividad',
    'Ciberseguridad',
    'Transformación Digital'
  ];

  currentText = '';
  currentIndex = 0;
  currentLetterIndex = 0;
  isDeleting = false;
  typingSpeed = 100;
  deleteSpeed = 50;
  pauseDuration = 2000;

  // Para breadcrumb dinámico
  title = 'Inicio';
  isHomePage = true;

  // Rutas con títulos
  pageTitles: { [key: string]: string } = {
    '/': 'Inicio',
    '/nosotros': 'Conocenos un poco',
    '/servicios': 'Servicios',
    '/servicios/infraestructura': 'Infraestructura IT',
    '/servicios/seguridad': 'Ciberseguridad',
    '/servicios/desarrollo': 'Desarrollo Web',
    '/servicios/cloud': 'Cloud Computing',
    '/servicios/soporte': 'Soporte Técnico',
    '/portafolio': 'Portafolio',
    '/blog': 'Blog',
    '/contacto': 'Envíanos un Mensaje'
  };

   private lastScrollTop = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.startTypingEffect();
    this.setupRouterListener();
    this.updatePageTitle();
  }

  // Configurar listener para cambios de ruta
  private setupRouterListener() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updatePageTitle();
      this.closeMenu(); // Cerrar menú al cambiar de página
    });
  }

  // Actualizar título según la ruta actual
  private updatePageTitle() {
    const currentUrl = this.router.url;
    this.title = this.pageTitles[currentUrl] || 'Página';
    this.isHomePage = currentUrl === '/';
  }

  // Efecto de typing
  startTypingEffect() {
    setTimeout(() => this.type(), 1000);
  }

  type() {
    const currentWord = this.typingTexts[this.currentIndex];
    
    if (this.isDeleting) {
      // Borrando
      this.currentText = currentWord.substring(0, this.currentLetterIndex - 1);
      this.currentLetterIndex--;
      
      if (this.currentLetterIndex === 0) {
        this.isDeleting = false;
        this.currentIndex = (this.currentIndex + 1) % this.typingTexts.length;
        setTimeout(() => this.type(), 500);
      } else {
        setTimeout(() => this.type(), this.deleteSpeed);
      }
    } else {
      // Escribiendo
      this.currentText = currentWord.substring(0, this.currentLetterIndex + 1);
      this.currentLetterIndex++;
      
      if (this.currentLetterIndex === currentWord.length) {
        this.isDeleting = true;
        setTimeout(() => this.type(), this.pauseDuration);
      } else {
        setTimeout(() => this.type(), this.typingSpeed);
      }
    }
  }

   @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.isScrolled = scrollTop > 100;
    
    if (scrollTop > 200 && scrollTop > this.lastScrollTop) {
      this.showTopbar = false;
    } else {
      this.showTopbar = true;
    }
    
    this.lastScrollTop = scrollTop;
  }

  // Cerrar menú móvil al cambiar a desktop
  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth > 767 && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  // Cerrar menú al hacer clic fuera - VERSIÓN SEGURA
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    // Verificar que el target sea un HTMLElement
    const target = event.target as HTMLElement;
    
    // Verificar si se hizo clic fuera del navbar y el menú está abierto
    if (target && !target.closest('.navbar') && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  // Control del menú
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      this.isMobileDropdownOpen = false;
    }
  }

  toggleMobileDropdown() {
    this.isMobileDropdownOpen = !this.isMobileDropdownOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.isMobileDropdownOpen = false;
    document.body.style.overflow = '';
  }
}
