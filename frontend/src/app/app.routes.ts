// Astringer/frontend/src/app/app.routes.ts (FINALIZED)

import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrackDetailComponent } from './track-detail/track-detail.component';
import { NotFoundComponent } from './not-found/not-found.component'; // <-- NEW IMPORT

export const routes: Routes = [
  // Default route - Dashboard
  { path: '', component: DashboardComponent, title: 'Astringer - Dashboard' },

  // Dynamic route for tracking a specific shipment
  { path: 'track/:id', component: TrackDetailComponent, title: 'Astringer - Track Shipment' },

  // Catch-all route (must be the LAST route) - Not Found (404)
  { path: '**', component: NotFoundComponent, title: 'Astringer - Page Not Found' } // <-- NEW CATCH-ALL
];
