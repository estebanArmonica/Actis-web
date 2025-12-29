import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Topbar } from '../../components/topbar/topbar';
import { Footer } from "../../components/footer/footer";
import { ClienteProyectos } from "../../components/cliente-proyectos/cliente-proyectos";

@Component({
  selector: 'app-home',
  imports: [Navbar, Topbar, Footer, ClienteProyectos],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
