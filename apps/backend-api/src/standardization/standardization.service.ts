import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class StandardizationService {
  private readonly aiBaseUrl = 'http://localhost:8000';

  constructor(private readonly httpService: HttpService) {}

  async validateName(name: string) {
    try {
      const response: any = await lastValueFrom(
        this.httpService.post<any>(`${this.aiBaseUrl}/ai/validate-name?name=${encodeURIComponent(name)}`)
      );
      return response.data;
    } catch (e) {
      return { name, is_valid: false, suggested_name: `2026-03-Corrected-${name}` };
    }
  }

  async renameBatch(files: any[]) {
    try {
      const response: any = await lastValueFrom(
        this.httpService.post<any>(`${this.aiBaseUrl}/ai/rename-batch`, files)
      );
      return response.data;
    } catch (e) {
      return files.map(f => ({ name: f.name, is_valid: false, suggested_name: `2026-03-Corrected-${f.name}` }));
    }
  }

  async applyRenaming(names: any[]) {
    // Simulação de aplicação de renomeação real nos provedores
    return {
      success: true,
      filesRenamed: names.length,
      timestamp: new Date().toISOString()
    };
  }
}
