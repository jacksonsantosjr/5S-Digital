import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  report: any = null;
  loading = true;
  riskClass: string = 'low';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchReport();
  }

  fetchReport() {
    this.loading = true;
    this.http.get('http://localhost:3030/security/compliance-report').subscribe((res: any) => {
      this.report = res;
      this.calculateRiskClass(res.score);
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  calculateRiskClass(score: number) {
    if (score > 90) this.riskClass = 'low';
    else if (score > 70) this.riskClass = 'medium';
    else this.riskClass = 'high';
  }
}
