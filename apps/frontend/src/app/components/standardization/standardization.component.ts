import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-standardization',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './standardization.component.html',
  styleUrls: ['./standardization.component.css']
})
export class StandardizationComponent implements OnInit {
  filesToReview: any[] = [];
  loading = false;
  renaming = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetchFiles();
  }

  fetchFiles() {
    this.loading = true;
    const mockFiles = [
      { id: '1', name: 'projeto_final_v2.pdf' },
      { id: '2', name: 'nota_fiscal_321.jpg' },
      { id: '3', name: 'contrato_aluguel_2024.docx' },
      { id: '4', name: 'relatorio_mensal_março.pdf' }
    ];

    this.http.post('http://localhost:3030/standardization/rename-batch', { files: mockFiles }).subscribe((res: any) => {
      this.filesToReview = res;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  applyBatch() {
    this.renaming = true;
    this.http.post('http://localhost:3030/standardization/apply', { names: this.filesToReview }).subscribe((res: any) => {
      alert(`Sucesso! ${res.filesRenamed} arquivos padronizados com sucesso.`);
      this.fetchFiles();
      this.renaming = false;
      this.cdr.detectChanges();
    });
  }
}
