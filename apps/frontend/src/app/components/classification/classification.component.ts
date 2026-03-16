import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-classification',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.css']
})
export class ClassificationComponent {
  selectedFile: File | null = null;
  processing = false;
  result: any = {
    category: 'Relatório Financeiro',
    confidence: 0.94,
    entities: [
      { key: 'Data', value: '20/12/2023' },
      { key: 'Valor', value: 'R$ 15.400,00' },
      { key: 'CNPJ', value: '12.345.678/0001-99' }
    ],
    summary: 'Este documento é uma fatura de serviços de TI contendo dados fiscais e datas de vencimento explícitas.'
  };

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  processDocument() {
    if (!this.selectedFile) return;

    this.processing = true;
    this.result = null;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:3030/ai/upload', formData).subscribe({
      next: (res) => {
        this.result = res;
        this.processing = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao processar:', err);
        alert('Erro ao processar documento.');
        this.processing = false;
        this.cdr.detectChanges();
      }
    });
  }
}
