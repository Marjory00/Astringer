// src/app/header/header.component.ts (FIXED)

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// 💥 FIX: RouterLinkActive is needed because it's used on the <a> tags in the HTML
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive, // ⬅️ ADDED: Essential for 'active' class styling
],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  appTitle = 'Astringer Logistics';
}
