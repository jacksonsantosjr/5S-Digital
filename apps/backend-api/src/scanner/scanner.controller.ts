import { Controller, Get, Post } from '@nestjs/common';
import { ScannerService } from './scanner.service';

@Controller('scanner')
export class ScannerController {
  constructor(private readonly scannerService: ScannerService) {}

  @Get('dashboard')
  getDashboardStats() {
    return this.scannerService.getMockDashboardStats();
  }

  @Post('start')
  startScan() {
    return this.scannerService.triggerScan();
  }
}
