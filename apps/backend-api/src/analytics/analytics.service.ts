import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AnalyticsService {
  private readonly aiBaseUrl = 'http://localhost:8000';

  constructor(private readonly httpService: HttpService) {}

  async getScorecard() {
    try {
      const response: any = await lastValueFrom(
        this.httpService.get<any>(`${this.aiBaseUrl}/ai/analytics/scorecard`)
      );
      return response.data;
    } catch (e) {
      return this.getMockScorecard();
    }
  }

  async getImpact() {
    try {
      const response: any = await lastValueFrom(
        this.httpService.get<any>(`${this.aiBaseUrl}/ai/analytics/impact`)
      );
      return response.data;
    } catch (e) {
      return { total_cleaned_gb: 458.2, cost_saved_usd: 1374.6 };
    }
  }

  async getSummary() {
    try {
      const response = await lastValueFrom(
        this.httpService.get<any>(`${this.aiBaseUrl}/ai/analytics/summary`)
      );
      return response.data;
    } catch (e) {
      return { summary: "Governança em evolução." };
    }
  }

  private getMockScorecard() {
    return {
      overall_score: 74,
      metrics: {
        seiri: { score: 82, label: "Utilização" },
        seiton: { score: 65, label: "Organização" },
        seiso: { score: 91, label: "Limpeza" },
        seiketsu: { score: 58, label: "Padronização" },
        shitsuke: { score: 75, label: "Disciplina" }
      }
    };
  }
}
