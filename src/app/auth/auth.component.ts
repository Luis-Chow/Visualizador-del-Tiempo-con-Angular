import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="max-width: 300px; margin: 50px auto; text-align: center; font-family: sans-serif;">
      <h2>{{ isLogin ? 'Iniciar Sesión' : 'Registrarse' }}</h2>
      
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <input #user placeholder="Usuario" type="text" style="padding: 8px;">
        <input #pin placeholder="Contraseña/PIN" type="password" style="padding: 8px;">
        
        <button (click)="onSubmit(user.value, pin.value)" style="padding: 10px; cursor: pointer;">
          {{ isLogin ? 'Entrar' : 'Crear cuenta' }}
        </button>
      </div>
      
      <p (click)="isLogin = !isLogin" style="cursor: pointer; color: blue; margin-top: 15px;">
        {{ isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión' }}
      </p>
      <p *ngIf="errorMsg" style="color: red;">{{ errorMsg }}</p>
    </div>
  `
})
export class AuthComponent {
  isLogin = true;
  errorMsg = '';
  
  authService = inject(AuthService);
  router = inject(Router);

  onSubmit(user: string, pin: string) {
    if (!user || !pin) {
      this.errorMsg = 'Llena los campos.';
      return;
    }

    if (this.isLogin) {
      const success = this.authService.login(user, pin);
      success ? this.router.navigate(['/visualizer']) : this.errorMsg = 'Credenciales incorrectas';
    } else {
      const success = this.authService.register(user, pin);
      if (success) {
        this.authService.login(user, pin);
        this.router.navigate(['/visualizer']);
      } else {
        this.errorMsg = 'El usuario ya existe';
      }
    }
  }
}