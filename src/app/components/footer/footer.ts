import { Component, OnInit, HostListener, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class Footer implements OnInit {
  currentYear: number;
  isBackToTopVisible = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollAnimations();
      this.checkBackToTop();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkBackToTop();
      this.checkScrollAnimations();
    }
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  private checkBackToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isBackToTopVisible = window.pageYOffset > 300;
    }
  }

  private initScrollAnimations(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  private checkScrollAnimations(): void {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        el.classList.add('animated');
      }
    });
  }
}
