import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'app_users';
  private currentUser: any = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const active = localStorage.getItem('active_user');
      if (active) this.currentUser = JSON.parse(active);
    }
  }

  register(username: string, pin: string): boolean {
    const users = this.getUsers();
    if (users.find((u: any) => u.username === username)) return false; 
    
    users.push({ username, pin });
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return true;
  }

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

  private getUsers() {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  }
}