import { Routes } from '@angular/router';
import PATH_CONFIG from './core/enums/path.enum';

export const routes: Routes = [
    {
        path: PATH_CONFIG.AUTH,
        loadComponent: () => import('./components/auth/auth.component').then(c => c.AuthComponent),
        children: [
            {
                path: PATH_CONFIG.REGISTRATION,
                loadComponent: () => import('./components/auth/registration/registration.component').then(c => c.RegistrationComponent)
            },
            {
                path: PATH_CONFIG.LOGIN,
                loadComponent: () => import('./components/auth/login/login.component').then(c => c.LoginComponent)
            }
        ]
    },
    {
        path: "",
        redirectTo: `${PATH_CONFIG.AUTH}/${PATH_CONFIG.REGISTRATION}`,
        pathMatch: 'full'
    }
];
