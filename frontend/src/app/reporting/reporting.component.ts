import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reporting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reporting.component.html',
  styleUrl: './reporting.component.scss' // <-- Correctly using SCSS
})
export class ReportingComponent {
  // Placeholder data to show in the component
  metrics = {
    totalShipments: '7,452',
    onTimeDelivery: '94.8%',
    avgTransitTime: '2.5 days',
    currentLoad: '450 units'
  };
}
