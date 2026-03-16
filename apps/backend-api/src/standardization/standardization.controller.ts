import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { StandardizationService } from './standardization.service';

@Controller('standardization')
export class StandardizationController {
  constructor(private readonly stdService: StandardizationService) {}

  @Post('validate')
  validateName(@Body('name') name: string) {
    return this.stdService.validateName(name);
  }

  @Post('rename-batch')
  renameBatch(@Body('files') files: any[]) {
    return this.stdService.renameBatch(files);
  }

  @Post('apply')
  applyRenaming(@Body('names') names: any[]) {
    return this.stdService.applyRenaming(names);
  }
}
