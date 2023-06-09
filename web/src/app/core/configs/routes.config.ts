import { Route } from "@angular/router";
import { AuthComponent } from "../../components/auth/auth.component";
import { Paths } from "../../shared/enums/path.enum";

export const routes: Route[] = [
    {
      path: Paths.AUTH,
      component: AuthComponent,
      children: [
        {
            path: Paths.SIGN_IN,
            loadComponent: () => import('../../components/auth/sign-in/sign-in.component').then(c => c.SignInComponent)
        },
        {
            path: Paths.SIGN_UP,
            loadComponent: () => import('../../components/auth/sign-up/sign-up.component').then(c => c.SignUpComponent)
        },
        {
          path: '',
          redirectTo: Paths.SIGN_IN,
          pathMatch: 'full'
        }
      ]
    },
    {
      path: '**',
      redirectTo: Paths.AUTH,
    },
  ];