import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  searchQuery = '';
  searchResults: any[] = [];
  suggestedMoves: any[] = [
    { name: 'Contrato_V1_Final.pdf', current_path: '/Downloads', suggested_path: '/Documentos/Contratos/2024', confidence: 0.98 },
    { name: 'img_reuniao_v2.png', current_path: '/Desktop', suggested_path: '/Imagens/Eventos/Maio', confidence: 0.85 }
  ];
  loading = false;
  applying = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetchSuggestions();
  }

  fetchSuggestions() {
    this.loading = true;
    this.http.post('http://localhost:3030/organization/reorganize/simulate', { files: [] }).subscribe((res: any) => {
      this.suggestedMoves = res;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  onSearch() {
    if (!this.searchQuery.trim()) return;
    this.http.post(`http://localhost:3030/organization/search?q=${this.searchQuery}`, { files: [] }).subscribe((res: any) => {
      this.searchResults = res;
      this.cdr.detectChanges();
    });
  }

  applyReorg() {
    this.applying = true;
    this.http.post('http://localhost:3030/organization/apply', { moves: this.suggestedMoves }).subscribe((res: any) => {
      alert(`Sucesso! ${res.filesMoved} arquivos reorganizados com segurança.`);
      this.fetchSuggestions();
      this.applying = false;
      this.cdr.detectChanges();
    });
  }
}
