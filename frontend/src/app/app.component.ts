// src/app/app.component.ts (FINAL FIXED VERSION) 🚀

import { Component } from '@angular/core';
// ⚠️ FIX: You need RouterLinkActive for the routerLinkActive directive used in the footer.
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    HeaderComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // ⚠️ appTitle is no longer needed here if it's only used in HeaderComponent
  // However, we keep currentYear because it's used in the footer.
  // appTitle = 'Astringer Logistics'; // Removed as it's only needed by HeaderComponent

  currentYear = new Date().getFullYear();
}
