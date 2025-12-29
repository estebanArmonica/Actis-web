import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from "../../components/footer/footer";
import { ClienteProyectos } from "../../components/cliente-proyectos/cliente-proyectos";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer, ClienteProyectos, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
