import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NavbarBreadcrumb } from "../../components/navbar-breadcrumb/navbar-breadcrumb";
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-blog',
  imports: [NavbarBreadcrumb, Footer],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})

export class Blog {
}
