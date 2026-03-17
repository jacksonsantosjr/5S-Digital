import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClassificationComponent } from './components/classification/classification.component';
import { CleanupComponent } from './components/cleanup/cleanup.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { StandardizationComponent } from './components/standardization/standardization.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { SustainabilityComponent } from './components/sustainability/sustainability.component';
import { SecurityComponent } from './components/security/security.component';
import { GamificationComponent } from './components/gamification/gamification.component';
import { IntegrationsComponent } from './components/integrations/integrations.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'classification', component: ClassificationComponent },
  { path: 'cleanup', component: CleanupComponent },
  { path: 'organization', component: OrganizationComponent },
  { path: 'standardization', component: StandardizationComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'sustainability', component: SustainabilityComponent },
  { path: 'security', component: SecurityComponent },
  { path: 'gamification', component: GamificationComponent },
  { path: 'integrations', component: IntegrationsComponent },
  { path: 'settings', component: SettingsComponent }
];
