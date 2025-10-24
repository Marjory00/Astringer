// Astringer/frontend/src/app/app.component.ts (FINALIZED)

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Re-add CommonModule for general safety
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    // FIX: NotificationComponent is now correctly included
    NotificationComponent
],
  template: `
    <app-header></app-header>

    <main class="content-container">
        <router-outlet></router-outlet>
    </main>

    <app-notification></app-notification>

    <app-footer></app-footer>
`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Astringer';
}
