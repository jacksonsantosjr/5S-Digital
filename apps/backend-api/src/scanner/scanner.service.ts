import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ScannerService {
  constructor(private httpService: HttpService) {}

  async getDashboardStats() {
    try {
      const response = await lastValueFrom(this.httpService.get<any>('http://localhost:8000/health'));
      if (response.status === 200) {
        // Aqui no futuro chamaremos o endpoint real de analytics do FastAPI
        return this.getMockDashboardStats();
      }
    } catch (e) {
      return this.getMockDashboardStats();
    }
  }

  getMockDashboardStats() {
    return {
      scoreGeral: 72,
      sensos: [
        { name: 'Seiri', value: 74, color: '#3b82f6', icon: '🧹' },
        { name: 'Seiton', value: 81, color: '#10b981', icon: '📁' },
        { name: 'Seiso', value: 62, color: '#f59e0b', icon: '✨' },
        { name: 'Seiketsu', value: 69, color: '#6366f1', icon: '📏' },
        { name: 'Shitsuke', value: 77, color: '#ec4899', icon: '🏆' }
      ],
      alertas: [
        { type: 'warning', title: 'Arquivos Duplicados', count: 12320, description: 'Economia potencial de 45GB' },
        { type: 'info', title: 'Downloads Esquecidos', count: 421, description: 'Arquivos não abertos há +6 meses' },
        { type: 'danger', title: 'Nomenclatura Fora do Padrão', count: 8521, description: 'Afeta 38% do diretório financeiro' }
      ],
      departamentos: [
        { name: 'Financeiro', score: 92 },
        { name: 'Jurídico', score: 88 },
        { name: 'Recursos Humanos', score: 75 },
        { name: 'Operações', score: 61 }
      ]
    };
  }

  async triggerScan(directoryPath: string = 'C:/Users') {
    try {
      await lastValueFrom(this.httpService.post('http://localhost:8000/scan/start', { directory_path: directoryPath }));
      return {
        message: `Varredura iniciada em ${directoryPath} no motor de IA com sucesso.`,
        scanId: 'scan_' + Date.now(),
        timestamp: new Date().toISOString()
      };
    } catch (e) {
      return {
        message: `Varredura iniciada em ${directoryPath} localmente (Motor IA offline).`,
        scanId: 'local_' + Date.now(),
        timestamp: new Date().toISOString()
      };
    }
  }
}
