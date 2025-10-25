// src/app/footer/footer.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// 💥 Imports required for routerLink
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink // To support the routerLink="/settings" in the template
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  // Property to hold the current year for the copyright notice
  currentYear = new Date().getFullYear();
}
