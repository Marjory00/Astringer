import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for simple templates like this

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.scss' // <-- Correctly using SCSS
})
export class PlanningComponent {
  // Simple function to generate a fake ID for the form preview
  getRandomId(): string {
    return (Math.floor(Math.random() * 900000) + 100000).toString();
  }
}
