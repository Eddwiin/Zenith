import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './core/routes.config';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
