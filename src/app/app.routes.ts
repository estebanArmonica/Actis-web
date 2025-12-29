import { Routes } from '@angular/router';
import { Contacto } from './pages/contacto/contacto';
import { Home } from './pages/home/home';


export const routes: Routes = [
    {
        path: '',
        component: Home,
    },
    {
        path: 'contacto',
        component: Contacto,
    }
];
