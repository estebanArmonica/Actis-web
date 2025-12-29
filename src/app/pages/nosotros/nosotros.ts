import { Component } from '@angular/core';
import { NavbarBreadcrumb } from "../../components/navbar-breadcrumb/navbar-breadcrumb";
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-nosotros',
  imports: [NavbarBreadcrumb, Footer],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css',
})
export class Nosotros {

}
