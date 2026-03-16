import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScannerModule } from './scanner/scanner.module';
import { AIModule } from './ai/ai.module';
import { DeduplicationModule } from './deduplication/deduplication.module';
import { OrganizationModule } from './organization/organization.module';
import { StandardizationModule } from './standardization/standardization.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { SustainabilityModule } from './sustainability/sustainability.module';
import { SecurityModule } from './security/security.module';
import { GamificationModule } from './gamification/gamification.module';
import { IntegrationsModule } from './integrations/integrations.module';

@Module({
  imports: [
    ScannerModule, 
    AIModule, 
    DeduplicationModule, 
    OrganizationModule, 
    StandardizationModule,
    AnalyticsModule,
    SustainabilityModule,
    SecurityModule,
    GamificationModule,
    IntegrationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
