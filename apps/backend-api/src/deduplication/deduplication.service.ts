import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DeduplicationService {
  private readonly aiBaseUrl = 'http://localhost:8000';

  constructor(private readonly httpService: HttpService) {}

  async findDuplicates(files: any[]) {
    try {
      const response = await lastValueFrom(
        this.httpService.post<any>(`${this.aiBaseUrl}/ai/deduplicate`, files)
      );
      return response.data;
    } catch (error) {
      return this.getMockDuplicates();
    }
  }

  getMockSummary() {
    return {
      totalDuplicates: 12320,
      potentialSavingsGB: 45.8,
      obsoleteFiles: 2010,
      healthScore: 62
    };
  }

  getMockDuplicates() {
    return [
      { original: 'doc_001', duplicate: 'doc_101', type: 'exact', reason: 'Hash binário idêntico', savingsMB: 12.5 },
      { original: 'doc_005', duplicate: 'doc_205', type: 'semantic', reason: 'Conteúdo 98% similar', savingsMB: 4.2 }
    ];
  }

  async performCleanup(fileIds: string[]) {
    // Simulação de ação de limpeza (em produção, moveria para lixeira no Google Drive/OneDrive)
    return {
      success: true,
      filesProcessed: fileIds.length,
      storageFreedMB: fileIds.length * 5.2, // Simulado
      timestamp: new Date().toISOString()
    };
  }
}
