import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrganizationService {
  private readonly aiBaseUrl = 'http://localhost:8000';

  constructor(private readonly httpService: HttpService) {}

  async suggestTaxonomy(files: any[]) {
    try {
      const response = await lastValueFrom(
        this.httpService.post<any>(`${this.aiBaseUrl}/ai/suggest-taxonomy`, files)
      );
      return response.data;
    } catch (e) {
      return this.getMockTaxonomy();
    }
  }

  async simulateReorg(files: any[]) {
    try {
      const response = await lastValueFrom(
        this.httpService.post<any>(`${this.aiBaseUrl}/ai/simulate-reorg`, files)
      );
      return response.data;
    } catch (e) {
      return this.getMockMoves();
    }
  }

  async semanticSearch(query: string, files: any[]) {
    try {
      const response = await lastValueFrom(
        this.httpService.post<any>(`${this.aiBaseUrl}/ai/search?query=${encodeURIComponent(query)}`, files)
      );
      return response.data;
    } catch (e) {
      return [];
    }
  }

  async applyReorganization(moves: any[]) {
    // Simulação de aplicação segura (Copy then Delete)
    return {
      success: true,
      filesMoved: moves.length,
      timestamp: new Date().toISOString(),
      reportUrl: '/reports/reorg_001.pdf'
    };
  }

  private getMockTaxonomy() {
    return {
      proposed_structure: {
        "Financeiro": ["Notas Fiscais", "Contratos"],
        "RH": ["Currículos", "Benefícios"]
      }
    };
  }

  private getMockMoves() {
    return [
      { file_id: '1', name: 'NF_Sueli_Jan.pdf', suggested_path: 'Financeiro/Notas Fiscais', confidence: 0.98 },
      { file_id: '2', name: 'Contrato_Aluguel.docx', suggested_path: 'Financeiro/Contratos', confidence: 0.95 }
    ];
  }
}
