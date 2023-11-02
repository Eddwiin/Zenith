import { Routes } from '@angular/router';
import PATH_CONFIG from './core/enums/path.enum';

export const routes: Routes = [
    {
        path: PATH_CONFIG.AUTH,
        loadComponent: () => import('./components/auth/auth.component').then(c => c.AuthComponent),
        children: [
            {
                path: PATH_CONFIG.REGISTRATION,
                loadComponent: () => import('./components/auth/registration/registration.component')
            },
            {
                path: PATH_CONFIG.LOGIN,
                loadComponent: () => import('./components/auth/login/login.component')
            }
        ]
    },
    {
        path: PATH_CONFIG.HOME,
        loadComponent: () => import('./components/home/home.component')
    },
    {
        path: "",
        redirectTo: `${PATH_CONFIG.AUTH}/${PATH_CONFIG.LOGIN}`,
        pathMatch: 'full'
    }
];
