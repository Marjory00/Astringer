// Astringer/frontend/src/app/not-found/not-found.component.ts

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="error-container">
      <h2>404 - Page Not Found 😟</h2>
      <p>Sorry, the shipment tracking or page you were looking for doesn't exist.</p>
      <button class="return-button" routerLink="/">
        ← Back to Dashboard
      </button>
    </div>
  `,
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent { }
