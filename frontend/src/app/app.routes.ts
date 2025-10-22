// Astringer/frontend/src/app/app.routes.ts

import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrackDetailComponent } from './track-detail/track-detail.component';

export const routes: Routes = [
  // V--- Ensure routes are not commented out or empty V
  { path: '', component: DashboardComponent },
  { path: 'track/:id', component: TrackDetailComponent },
  { path: '**', redirectTo: '' }
];
