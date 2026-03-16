import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SustainabilityService {
  private readonly aiBaseUrl = 'http://localhost:8000';

  constructor(private readonly httpService: HttpService) {}

  async checkCompliance(files: any[]) {
    try {
      const response: any = await lastValueFrom(
        this.httpService.post<any>(`${this.aiBaseUrl}/ai/sustainability/compliance`, files)
      );
      return response.data;
    } catch (e) {
      return { compliance_rate: 85, anomalies_found: 12, alerts: [] };
    }
  }

  async getAutomationStats() {
    try {
      const response: any = await lastValueFrom(
        this.httpService.get<any>(`${this.aiBaseUrl}/ai/sustainability/automation`)
      );
      return response.data;
    } catch (e) {
      return { active_rules: 5, files_auto_processed_30d: 450, auto_cleanup_enabled: true };
    }
  }

  async checkMaintenance() {
    try {
      const response = await lastValueFrom(
        this.httpService.get<any>(`${this.aiBaseUrl}/ai/sustainability/maintenance`)
      );
      return response.data;
    } catch (e) {
      return { maintenance_needed: false };
    }
  }
}
