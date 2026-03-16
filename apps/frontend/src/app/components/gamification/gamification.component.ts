import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gamification',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gamification.component.html',
  styleUrls: ['./gamification.component.css']
})
export class GamificationComponent implements OnInit {
  profile: any = null;
  leaderboard: any[] = [];
  loading = true;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.http.get('http://localhost:3030/gamification/profile/1').subscribe((p: any) => {
      this.profile = p;
      this.http.get('http://localhost:3030/gamification/leaderboard').subscribe((l: any) => {
        this.leaderboard = l;
        this.loading = false;
        this.cdr.detectChanges();
      });
    });
  }

  getRankEmoji(index: number): string {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '👤';
  }
}
