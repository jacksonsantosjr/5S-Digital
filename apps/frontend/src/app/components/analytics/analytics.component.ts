import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  scorecard: any = null;
  impact: any = null;
  summary: string = '';
  loading = true;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.http.get('http://localhost:3030/analytics/scorecard').subscribe((s: any) => {
      this.scorecard = s;
      this.http.get('http://localhost:3030/analytics/impact').subscribe((i: any) => {
        this.impact = i;
        this.http.get('http://localhost:3030/analytics/summary').subscribe((sum: any) => {
          this.summary = sum.summary;
          this.loading = false;
          this.cdr.detectChanges();
        });
      });
    });
  }

  getMetricValue(key: string): number {
    return this.scorecard?.metrics[key]?.score || 0;
  }
}
