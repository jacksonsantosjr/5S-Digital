import { Controller, Post, Body, Get, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SecurityService } from './security.service';

@Controller('security')
export class SecurityController {
  constructor(private readonly secService: SecurityService) {}

  @Post('scan-text')
  scanText(@Body('text') text: string) {
    return this.secService.scanText(text);
  }

  @Post('mask')
  maskText(@Body('text') text: string) {
    return this.secService.maskText(text);
  }

  @Post('scan-document')
  @UseInterceptors(FileInterceptor('file'))
  scanDocument(@UploadedFile() file: any) {
    return this.secService.scanDocument(file);
  }

  @Get('compliance-report')
  getReport() {
    return this.secService.getMockReport();
  }
}
