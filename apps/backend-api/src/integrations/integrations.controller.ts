import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';

@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly intService: IntegrationsService) {}

  @Get('connectors')
  getConnectors() {
    return this.intService.getConnectors();
  }

  @Post('connect')
  connect(@Body() data: { provider: string }) {
    return this.intService.connectProvider(data.provider);
  }

  @Post('sync')
  sync(@Body() data: { provider: string }) {
    return this.intService.syncMetadata(data.provider);
  }
}
