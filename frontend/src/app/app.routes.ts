// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrackDetailComponent } from './track-detail/track-detail.component';
import { PlanningComponent } from './planning/planning.component';
import { ReportingComponent } from './reporting/reporting.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'track/:id', component: TrackDetailComponent },
  { path: 'planning', component: PlanningComponent },
  { path: 'reporting', component: ReportingComponent },
  { path: 'settings', component: SettingsComponent },
  // Default redirect
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // Wildcard for 404/not found (optional)
  // { path: '**', component: NotFoundComponent }
];
