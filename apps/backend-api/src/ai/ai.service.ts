import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
const FormData = require('form-data');

@Injectable()
export class AIService {
  private readonly aiBaseUrl = 'http://localhost:8000';

  constructor(private readonly httpService: HttpService) {}

  async classifyText(text: string) {
    try {
      const response: any = await lastValueFrom(
        this.httpService.post<any>(`${this.aiBaseUrl}/ai/classify?text=${encodeURIComponent(text)}`)
      );
      return response.data;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao comunicar com o motor de IA');
    }
  }

  async processDocument(file: any) {
    try {
      const formData = new FormData();
      formData.append('file', file.buffer, file.originalname);

      const response: any = await lastValueFrom(
        this.httpService.post<any>(`${this.aiBaseUrl}/ai/ocr-and-classify`, formData, {
          headers: formData.getHeaders(),
        })
      );
      return response.data;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao processar documento no motor de IA');
    }
  }
}
