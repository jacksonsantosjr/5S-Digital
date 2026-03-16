import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AIService } from './ai.service';

@Controller('ai')
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post('classify')
  classifyText(@Body('text') text: string) {
    return this.aiService.classifyText(text);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadAndClassify(@UploadedFile() file: any) {
    return this.aiService.processDocument(file);
  }
}
