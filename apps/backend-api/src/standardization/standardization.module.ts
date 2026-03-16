import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { StandardizationController } from './standardization.controller';
import { StandardizationService } from './standardization.service';

@Module({
  imports: [HttpModule],
  controllers: [StandardizationController],
  providers: [StandardizationService],
})
export class StandardizationModule {}
