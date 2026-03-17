import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  // Versão de sincronização: 1.0.4
  title = () => '5S Digital';
  isLightTheme = false;
  isSidebarExpanded = true;

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private cdr: ChangeDetectorRef
  ) {
    this.isLightTheme = localStorage.getItem('theme') === 'light';
    this.updateTheme();

    // Sincronizar UI com navegação em modo Zoneless
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  startScan() {
    this.http.post('http://localhost:3030/scanner/start', {}).subscribe({
      next: (res: any) => {
        alert(res.message);
      },
      error: (err) => alert('Erro ao iniciar varredura')
    });
  }

  toggleTheme() {
    this.isLightTheme = !this.isLightTheme;
    localStorage.setItem('theme', this.isLightTheme ? 'light' : 'dark');
    this.updateTheme();
  }

  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }

  private updateTheme() {
    if (this.isLightTheme) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }
}
