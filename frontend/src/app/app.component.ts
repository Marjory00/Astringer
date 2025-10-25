// src/app/app.component.ts (FINALIZED with Footer import)

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { NotificationComponent } from "./notification/notification.component";
// 💥 New Import
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    HeaderComponent,
    NotificationComponent,
    FooterComponent // 💥 FooterComponent added to imports
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // 💥 Removed currentYear, as it is now managed by FooterComponent
}
