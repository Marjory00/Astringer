// Astringer/frontend/src/app/app.config.ts

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'; // <-- Import this!
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // 💡 FIX 2: This explicitly enables the Zone.js-based change detection.
    provideZoneChangeDetection({ eventCoalescing: true }),

    // ... other providers ...
    provideRouter(routes),
    provideHttpClient()
  ]
};
