import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SecurityService {
  private readonly aiBaseUrl = 'http://localhost:8000';

  constructor(private readonly httpService: HttpService) {}

  async scanText(text: string) {
    try {
      const response: any = await lastValueFrom(
        this.httpService.post<any>(`${this.aiBaseUrl}/ai/security/scan?text=${encodeURIComponent(text)}`)
      );
      return response.data;
    } catch (e) {
      return { is_secure: false, sensitive_data_found: [{ type: 'CPF', count: 1, severity: 'high' }] };
    }
  }

  async maskText(text: string) {
    try {
      const response: any = await lastValueFrom(
        this.httpService.post<any>(`${this.aiBaseUrl}/ai/security/mask?text=${encodeURIComponent(text)}`)
      );
      return response.data;
    } catch (e) {
      return { masked_text: "[DADO PROTEGIDO]" };
    }
  }

  async scanDocument(file: any) {
    try {
      // Em produção, enviamos o buffer ao FastAPI para OCR e análise
      return { is_secure: true, risk_score: 10 };
    } catch (e) {
      return { is_secure: true, risk_score: 0 };
    }
  }

  getMockReport() {
    return {
      status: "compliant",
      score: 94,
      lastAudit: new Date().toISOString(),
      issues: [
        { file: "contatos.csv", issue: "Contém 12 E-mails expostos", action: "Mascarar" }
      ]
    };
  }
}
