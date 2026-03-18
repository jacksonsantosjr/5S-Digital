import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = '5s_digital_session';
  private router = inject(Router);
  
  // Usando Signal para reatividade eficiente no Angular 17+
  isLoggedIn = signal<boolean>(false);

  constructor() {
    this.checkSession();
  }

  private checkSession() {
    const session = localStorage.getItem(this.STORAGE_KEY);
    if (session === 'active') {
      this.isLoggedIn.set(true);
    }
  }

  login(email: string, pass: string): boolean {
    // Por enquanto, validação em memória contra os dados de configuração
    if (email === 'jackson.junior@empresa.com.br' && pass === 'admin123') {
      this.isLoggedIn.set(true);
      localStorage.setItem(this.STORAGE_KEY, 'active');
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.isLoggedIn.set(false);
    this.router.navigate(['/']);
  }
}
