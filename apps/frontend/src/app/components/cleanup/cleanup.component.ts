import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cleanup',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cleanup.component.html',
  styleUrls: ['./cleanup.component.css']
})
export class CleanupComponent implements OnInit {
  summary: any = {
    totalDuplicates: 12320,
    potentialSavingsGB: 45.8,
    obsoleteFiles: 2010
  };
  duplicates: any[] = [
    { duplicate: 'doc_101', reason: 'Hash binário idêntico', savingsMB: 12.5 },
    { duplicate: 'doc_205', reason: 'Conteúdo 98% similar', savingsMB: 4.2 }
  ];
  loading = false;
  cleaning = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.http.get('http://localhost:3030/deduplication/summary').subscribe((s: any) => {
      this.summary = s;
      this.http.post('http://localhost:3030/deduplication/find', { files: [] }).subscribe((d: any) => {
        this.duplicates = d;
        this.loading = false;
        this.cdr.detectChanges();
      });
    });
  }

  performCleanup() {
    this.cleaning = true;
    const fileIds = this.duplicates.map(d => d.duplicate);
    this.http.post('http://localhost:3030/deduplication/cleanup', { fileIds }).subscribe((res: any) => {
      alert(`Sucesso! ${res.storageFreedMB.toFixed(1)}MB liberados.`);
      this.duplicates = [];
      this.summary.totalDuplicates = 0;
      this.summary.potentialSavingsGB = 0;
      this.cleaning = false;
      this.cdr.detectChanges();
    });
  }
}
