// src/app/app.component.ts

import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  // Only router directives and CommonModule are needed here now that routing
  // is configured globally in app.config.ts
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Assumes you only use the SCSS file
})
export class AppComponent {
  title = 'Astringer Logistics Dashboard';
  // FIX: Defines the property for the footer
  currentYear = new Date().getFullYear();
}
