import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

// Componente para manejar el flujo de entrada y registro
// Se usa una sola vista que cambia segun el estado de isLogin
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  template: ``
})
export class AuthComponent {
  isLogin = true; // Switch para cambiar entre login y registro
  errorMsg = '';  
  
  authService = inject(AuthService);
  router = inject(Router);

  // Maneja el clic del boton principal
  onSubmit(user: string, pin: string) {
    if (!user || !pin) {
      this.errorMsg = 'Faltan datos.';
      return;
    }

    if (this.isLogin) {
      // Intenta validar contra el localStorage
      const success = this.authService.login(user, pin);
      success ? this.router.navigate(['/visualizer']) : this.errorMsg = 'Datos incorrectos';
    } else {
      // Crea un nuevo usuario si no existe
      const success = this.authService.register(user, pin);
      if (success) {
        this.authService.login(user, pin);
        this.router.navigate(['/visualizer']);
      } else {
        this.errorMsg = 'Usuario ocupado';
      }
    }
  }
}