// Astringer/frontend/src/main.ts

// 💡 FIX 1: Ensure Zone.js is imported BEFORE bootstrapping.
// If you are using a modern CLI setup, this line might be added automatically or
// already present in polyfills.ts, but explicitly check its existence.
import 'zone.js';

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
