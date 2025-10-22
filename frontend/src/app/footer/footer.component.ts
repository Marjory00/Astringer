
// Astringer/frontend/src/app/footer/footer.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="main-footer">
      <p>&copy; {{ currentYear }} Astringer Logistics Tracking. All rights reserved.</p>
    </footer>
  `,
  styles: [`
    .main-footer {
      text-align: center;
      padding: 20px;
      margin-top: 50px;
      border-top: 1px solid #e0e0e0;
      color: #777;
      font-size: 0.9em;
      background-color: #f8f8f8;
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
