import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { authGuard } from './core/auth.guard'; 

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'visualizer', component: VisualizerComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/visualizer', pathMatch: 'full' },
  { path: '**', redirectTo: '/visualizer' }
];