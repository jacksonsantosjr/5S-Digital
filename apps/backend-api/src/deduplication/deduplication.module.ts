import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DeduplicationController } from './deduplication.controller';
import { DeduplicationService } from './deduplication.service';

@Module({
  imports: [HttpModule],
  controllers: [DeduplicationController],
  providers: [DeduplicationService],
})
export class DeduplicationModule {}
