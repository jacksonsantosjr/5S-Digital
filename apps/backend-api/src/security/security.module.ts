import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';

@Module({
  imports: [HttpModule],
  controllers: [SecurityController],
  providers: [SecurityService],
})
export class SecurityModule {}
