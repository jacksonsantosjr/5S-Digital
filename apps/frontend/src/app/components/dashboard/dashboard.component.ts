import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  scoreGeral = 72;
  sensos: any[] = [
    { name: 'Seiri', value: 74, color: '#3b82f6', icon: '🧹' },
    { name: 'Seiton', value: 81, color: '#10b981', icon: '📁' },
    { name: 'Seiso', value: 62, color: '#f59e0b', icon: '✨' },
    { name: 'Seiketsu', value: 69, color: '#6366f1', icon: '📏' },
    { name: 'Shitsuke', value: 77, color: '#ec4899', icon: '🏆' }
  ];
  alertas: any[] = [
    { type: 'warning', title: 'Arquivos Duplicados', count: 12320, description: 'Economia potencial de 45GB' },
    { type: 'info', title: 'Downloads Esquecidos', count: 421, description: 'Arquivos não abertos há +6 meses' },
    { type: 'danger', title: 'Nomenclatura Fora do Padrão', count: 8521, description: 'Afeta 38% do diretório financeiro' }
  ];
  departamentos: any[] = [
    { name: 'Financeiro', score: 92 },
    { name: 'Jurídico', score: 88 },
    { name: 'Recursos Humanos', score: 75 },
    { name: 'Operações', score: 61 }
  ];
  loading = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchStats();
  }

  fetchStats() {
    this.loading = true;
    this.http.get<any>('http://localhost:3030/scanner/dashboard').subscribe({
      next: (data) => {
        this.scoreGeral = data.scoreGeral;
        this.sensos = data.sensos;
        this.alertas = data.alertas;
        this.departamentos = data.departamentos;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao buscar estatísticas:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  startScan() {
    this.http.post('http://localhost:3030/scanner/start', {}).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.cdr.detectChanges();
      },
      error: (err) => alert('Erro ao iniciar varredura')
    });
  }
}
