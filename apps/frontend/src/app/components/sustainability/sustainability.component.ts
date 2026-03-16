import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sustainability',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sustainability.component.html',
  styleUrls: ['./sustainability.component.css']
})
export class SustainabilityComponent implements OnInit {
  compliance: any = null;
  automation: any = null;
  maintenanceNeeded = false;
  loading = true;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.http.post('http://localhost:3030/sustainability/compliance', { files: [] }).subscribe((c: any) => {
      this.compliance = c;
      this.http.get('http://localhost:3030/sustainability/automation').subscribe((a: any) => {
        this.automation = a;
        this.http.get('http://localhost:3030/sustainability/maintenance').subscribe((m: any) => {
          this.maintenanceNeeded = m.maintenance_needed;
          this.loading = false;
          this.cdr.detectChanges();
        });
      });
    });
  }

  toggleAutoCleanup() {
    this.automation.auto_cleanup_enabled = !this.automation.auto_cleanup_enabled;
    // Simulação de salvamento de configuração
    alert(`Limpeza automática ${this.automation.auto_cleanup_enabled ? 'ativada' : 'desativada'}.`);
    this.cdr.detectChanges();
  }
}
