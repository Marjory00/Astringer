// src/app/app.config.ts

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router'; // 👈 Needed for routing
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes'; // 👈 Import route definitions

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // CRITICAL FIX: Provides the routes to the entire application
    provideRouter(routes),
    provideHttpClient(),
  ]
};
