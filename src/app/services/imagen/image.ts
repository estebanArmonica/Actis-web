import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Image {
  private basePath = 'assets/img/';

  getImagePath(imageName: string): string {
    return `${this.basePath}${imageName}`;
  }

  getImages(): { [key: string]: string } {
    return {
      about: this.getImagePath('about.jpg'),
      feature: this.getImagePath('feature.jpg'),
      carousel1: this.getImagePath('carousel-1.jpg'),
      carousel2: this.getImagePath('carousel-2.jpg'),
      testimonial1: this.getImagePath('testimonial-1.jpg'),
      testimonial2: this.getImagePath('testimonial-2.jpg'),
      testimonial3: this.getImagePath('testimonial-3.jpg'),
      testimonial4: this.getImagePath('testimonial-4.jpg'),
      vendor1: this.getImagePath('vendor-1.jpg'),
      vendor2: this.getImagePath('vendor-2.jpg'),
      vendor3: this.getImagePath('vendor-3.jpg'),
      vendor4: this.getImagePath('vendor-4.jpg'),
      vendor5: this.getImagePath('vendor-5.jpg'),
      vendor6: this.getImagePath('vendor-6.jpg'),
      vendor7: this.getImagePath('vendor-7.jpg'),
      vendor8: this.getImagePath('vendor-8.jpg'),
      vendor9: this.getImagePath('vendor-9.jpg')
    };
  }
}
