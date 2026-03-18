import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
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
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'classification', component: ClassificationComponent, canActivate: [authGuard] },
  { path: 'cleanup', component: CleanupComponent, canActivate: [authGuard] },
  { path: 'organization', component: OrganizationComponent, canActivate: [authGuard] },
  { path: 'standardization', component: StandardizationComponent, canActivate: [authGuard] },
  { path: 'analytics', component: AnalyticsComponent, canActivate: [authGuard] },
  { path: 'sustainability', component: SustainabilityComponent, canActivate: [authGuard] },
  { path: 'security', component: SecurityComponent, canActivate: [authGuard] },
  { path: 'gamification', component: GamificationComponent, canActivate: [authGuard] },
  { path: 'integrations', component: IntegrationsComponent, canActivate: [authGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard] }
];
