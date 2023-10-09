import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { API_BASE_URL } from './core/configs/api.config';
import { routes } from './core/configs/routes.config';
import { AuthEffects } from './core/store/effects/auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideEffects([AuthEffects]),
    { provide: API_BASE_URL, useValue: 'http://localhost:8080/api'}
  ]
};
