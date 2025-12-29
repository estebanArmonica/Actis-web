import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class Navbar implements OnInit {
  
  // Estado del navbar
  isScrolled = false;
  isMenuOpen = false;
  isMobileDropdownOpen = false;
  showTopbar = true;

  // Texto para typing effect
  typingTexts: string[] = [
    'Desarrollo de Software',
    'App Móvil',
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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Controlar scroll del navbar
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.isScrolled = scrollTop > 100;
    
    // Ocultar topbar al hacer scroll hacia abajo
    if (scrollTop > 200 && scrollTop > this.lastScrollTop) {
      this.showTopbar = false;
    } else {
      this.showTopbar = true;
    }
    
    this.lastScrollTop = scrollTop;
  }

  @HostListener('window:resize', [])
  onResize() {
    // Cerrar menú al cambiar a desktop si estaba abierto
    if (window.innerWidth > 767 && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  private lastScrollTop = 0;

  ngOnInit() {
    this.startTypingEffect();
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

  // Control del menú
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    // Bloquear scroll cuando el menú está abierto
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

  // Cerrar menú al hacer clic fuera (si es necesario)
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.navbar') && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  // Para evitar problemas con dropdowns en desktop
  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent) {
    if (window.innerWidth > 767) {
      // Verificar que target sea HTMLElement
      const target = event.target as HTMLElement;
      
      // Encontrar el nav-item más cercano
      const navItem = target.closest('.nav-item');
      if (navItem) {
        navItem.classList.add('hover');
      }
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    if (window.innerWidth > 767) {
      // Verificar que target sea HTMLElement
      const target = event.target as HTMLElement;
      
      // Encontrar el nav-item más cercano
      const navItem = target.closest('.nav-item');
      if (navItem) {
        navItem.classList.remove('hover');
      }
    }
  }
}
