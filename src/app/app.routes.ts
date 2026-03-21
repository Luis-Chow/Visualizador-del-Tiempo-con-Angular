import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { authGuard } from './core/auth.guard'; 

// Definicion de las rutas de la aplicacion
export const routes: Routes = [
  { path: 'auth', component: AuthComponent }, // Pantalla de login/registro
  { 
    path: 'visualizer', 
    component: VisualizerComponent, 
    canActivate: [authGuard] // Solo entra si el guard da el ok
  },
  // Redireccion por defecto al visualizador (el guard pedira login si no hay sesion)
  { path: '', redirectTo: '/visualizer', pathMatch: 'full' },
  { path: '**', redirectTo: '/visualizer' } // Manejo de rutas inexistentes
];