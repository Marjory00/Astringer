// Astringer/frontend/src/app/header/header.component.ts

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="main-header">
      <nav>
        <a routerLink="/" class="logo">Astringer Logistics</a>
      </nav>
    </header>
  `,
  styles: [`
    .main-header {
      background-color: #004d99; /* Use primary color */
      padding: 15px 30px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .logo {
      color: white;
      text-decoration: none;
      font-size: 1.5em;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
  `]
})
export class HeaderComponent {}
