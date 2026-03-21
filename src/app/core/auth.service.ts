import { Injectable } from '@angular/core';

// Servicio central para manejar usuarios y sesion actual
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'app_users'; // Key para el array de usuarios en localstorage
  private currentUser: any = null;

  constructor() {
    // Al arrancar, revisa si quedo una sesion abierta en el navegador
    if (typeof window !== 'undefined') {
      const active = localStorage.getItem('active_user');
      if (active) this.currentUser = JSON.parse(active);
    }
  }

  // Registra un nuevo user si el nombre no esta tomado
  register(username: string, pin: string): boolean {
    const users = this.getUsers();
    if (users.find((u: any) => u.username === username)) return false; 
    
    users.push({ username, pin });
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return true;
  }

  // Valida credenciales y guarda el usuario activo
  login(username: string, pin: string): boolean {
    const users = this.getUsers();
    const user = users.find((u: any) => u.username === username && u.pin === pin);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('active_user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('active_user');
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  // Helper para sacar la lista de usuarios del storage
  private getUsers() {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  }
}