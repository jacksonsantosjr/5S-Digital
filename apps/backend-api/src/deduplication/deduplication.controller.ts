import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { DeduplicationService } from './deduplication.service';

@Controller('deduplication')
export class DeduplicationController {
  constructor(private readonly dedupService: DeduplicationService) {}

  @Get('summary')
  getDeduplicationSummary() {
    return this.dedupService.getMockSummary();
  }

  @Post('find')
  findDuplicates(@Body('files') files: any[]) {
    return this.dedupService.findDuplicates(files);
  }

  @Post('cleanup')
  cleanupFiles(@Body('fileIds') fileIds: string[]) {
    return this.dedupService.performCleanup(fileIds);
  }
}
