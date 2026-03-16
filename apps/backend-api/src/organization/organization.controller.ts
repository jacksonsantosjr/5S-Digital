import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly orgService: OrganizationService) {}

  @Post('taxonomy/suggest')
  suggestTaxonomy(@Body('files') files: any[]) {
    return this.orgService.suggestTaxonomy(files);
  }

  @Post('reorganize/simulate')
  simulateReorg(@Body('files') files: any[]) {
    return this.orgService.simulateReorg(files);
  }

  @Post('search')
  search(@Query('q') query: string, @Body('files') files: any[]) {
    return this.orgService.semanticSearch(query, files);
  }

  @Post('apply')
  applyReorg(@Body('moves') moves: any[]) {
    return this.orgService.applyReorganization(moves);
  }
}
