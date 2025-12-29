import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
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
  @Input() title: string = '';
  isScrolled = false;
  isMenuOpen = false;

  constructor(private router: Router){

    // obtenemos el titulo de la ruta actual
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setPageTitle();
    });
  }

  setPageTitle() {
    const currentUrl = this.router.url;

    // Mapeo de URLs A TÍTULOS
    const titleMaps: {[key: string]: string} = {
      "/contacto": "Envíanos un mensaje",
      '/nosotros': 'About Us',
      '/servicios': 'Our Services',
      '/portafolio': 'Portfolio',
      '/blog': 'Blog',
      '/precios': 'Pricing',
      '/equipo': 'Our Team',
      '/testimonios': 'Testimonials'
    };

    this.title = titleMaps[currentUrl] || 'Page';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
