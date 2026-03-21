import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), // Manejo de errores en navegador
    provideRouter(routes) // Inyecta la configuracion de rutas definida antes
  ]
};