// src/app/app.routes.ts (FINALIZED)

import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrackDetailComponent } from './track-detail/track-detail.component';
import { PlanningComponent } from './planning/planning.component';
import { ReportingComponent } from './reporting/reporting.component';
// 💥 FIX: Including the existing SettingsComponent
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
    // Core application routes with titles
    { path: 'dashboard', component: DashboardComponent, title: 'Astringer | Dashboard' },
    { path: 'planning', component: PlanningComponent, title: 'Astringer | Planning' },
    { path: 'reporting', component: ReportingComponent, title: 'Astringer | Reporting' },
    { path: 'settings', component: SettingsComponent, title: 'Astringer | Settings' }, // Added Settings route

    // Parameterized Route: TrackDetail expects an ID
    { path: 'track/:id', component: TrackDetailComponent, title: 'Astringer | Track Details' },

    // Default Route: Redirect empty path to the Dashboard
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    // Wildcard Route: Handles 404 Not Found
    { path: '**', redirectTo: 'dashboard' }
];
