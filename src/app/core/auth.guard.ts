import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

// Guard de ruta para bloquear acceso a usuarios no logueados
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si el servicio dice que hay sesion, deja pasar
  if (authService.isLoggedIn()) {
    return true;
  }
  
  // Si no, lo manda directo al login
  router.navigate(['/auth']);
  return false;
};