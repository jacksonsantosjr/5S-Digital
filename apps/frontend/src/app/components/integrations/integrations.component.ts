import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-integrations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.css']
})
export class IntegrationsComponent implements OnInit {
  connectors: any[] = [];
  loading = true;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchConnectors();
  }

  fetchConnectors() {
    this.loading = true;
    this.http.get('http://localhost:3030/integrations/connectors').subscribe((res: any) => {
      this.connectors = res;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  connect(id: string) {
    this.http.post('http://localhost:3030/integrations/connect', { provider: id }).subscribe((res: any) => {
      alert(res.message);
      this.fetchConnectors();
      this.cdr.detectChanges();
    });
  }

  sync(id: string) {
    this.http.post('http://localhost:3030/integrations/sync', { provider: id }).subscribe((res: any) => {
      alert(`Sincronização concluída! ${res.filesSynced} arquivos processados.`);
      this.fetchConnectors();
      this.cdr.detectChanges();
    });
  }
}
