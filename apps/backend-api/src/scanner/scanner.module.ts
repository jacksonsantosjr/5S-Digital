import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScannerController } from './scanner.controller';
import { ScannerService } from './scanner.service';

@Module({
  imports: [HttpModule],
  controllers: [ScannerController],
  providers: [ScannerService],
})
export class ScannerModule {}
