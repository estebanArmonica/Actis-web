import { Routes } from '@angular/router';
import { Contacto } from './pages/contacto/contacto';
import { Home } from './pages/home/home';
import { Nosotros } from './pages/nosotros/nosotros';
import { Blog } from './pages/blog/blog';


export const routes: Routes = [
    {
        path: '',
        component: Home,
    },
    {
        path: 'contacto',
        component: Contacto,
    },
    {
        path: 'nosotros',
        component: Nosotros
    },
    {
        path: 'blog',
        component: Blog
    }
];
