import { Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Spinner } from './components/spinner/spinner';
import { Navbar } from './components/navbar/navbar';
import { Topbar } from "./components/topbar/topbar";
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Spinner, Navbar, Topbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class App {
  protected readonly title = signal('web-actis');
}
