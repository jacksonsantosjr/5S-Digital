import { Controller, Get, Post, Body } from '@nestjs/common';
import { SustainabilityService } from './sustainability.service';

@Controller('sustainability')
export class SustainabilityController {
  constructor(private readonly susService: SustainabilityService) {}

  @Post('compliance')
  checkCompliance(@Body('files') files: any[]) {
    return this.susService.checkCompliance(files);
  }

  @Get('automation')
  getAutomation() {
    return this.susService.getAutomationStats();
  }

  @Get('maintenance')
  checkMaintenance() {
    return this.susService.checkMaintenance();
  }
}
