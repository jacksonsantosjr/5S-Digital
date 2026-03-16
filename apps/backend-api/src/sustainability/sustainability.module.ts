import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SustainabilityController } from './sustainability.controller';
import { SustainabilityService } from './sustainability.service';

@Module({
  imports: [HttpModule],
  controllers: [SustainabilityController],
  providers: [SustainabilityService],
})
export class SustainabilityModule {}
