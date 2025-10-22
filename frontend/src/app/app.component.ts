// Astringer/frontend/src/app/app.component.ts

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component'; // <-- NEW IMPORT
import { FooterComponent } from './footer/footer.component'; // <-- NEW IMPORT

@Component({
  selector: 'app-root',
  standalone: true,
  // Add the new components to imports
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>

    <main class="content-container">
      <router-outlet></router-outlet>
    </main>

    <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Astringer';
}
