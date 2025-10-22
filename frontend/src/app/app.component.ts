// Astringer/frontend/src/app/app.component.ts

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Correctly imported for NgIf, NgFor, etc.

@Component({
  selector: 'app-root', // Correctly matches the tag in index.html
  standalone: true,     // Correctly marked as a standalone component
  imports: [
    CommonModule,     // Imports standard Angular directives
    RouterOutlet      // Correctly enables routing by injecting the child route component
  ],
  template: `
    <div class="container">
      <h1>Astringer Logistics Tracking Dashboard</h1>
      <router-outlet></router-outlet>  </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Astringer Logistics'; // Correctly defines a component property
}
