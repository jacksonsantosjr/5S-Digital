import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  showLogin = false;
  email = '';
  password = '';
  errorMessage = '';

  openLogin() {
    this.showLogin = true;
    this.errorMessage = '';
  }

  closeLogin() {
    this.showLogin = false;
  }

  handleLogin() {
    if (this.authService.login(this.email, this.password)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Credenciais inválidas. Verifique seu e-mail e senha.';
    }
  }
}
