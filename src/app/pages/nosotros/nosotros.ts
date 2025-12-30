import { Component } from '@angular/core';
import { NavbarBreadcrumb } from "../../components/navbar-breadcrumb/navbar-breadcrumb";
import { Footer } from "../../components/footer/footer";
import { RouterLink } from "@angular/router";
import { ClienteProyectos } from "../../components/cliente-proyectos/cliente-proyectos";

@Component({
  selector: 'app-nosotros',
  imports: [NavbarBreadcrumb, Footer, RouterLink, ClienteProyectos],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css',
})
export class Nosotros {

}
