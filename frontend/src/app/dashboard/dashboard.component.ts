// src/app/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ShipmentService } from '../shipment.service';
import { Shipment } from '../shipment.model';
import { Observable, finalize, catchError, of, timeout, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  shipments$!: Observable<Shipment[]>;
  isLoading: boolean = true;
  apiError: string | null = null;

  constructor(
    private shipmentService: ShipmentService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.apiError = null;

    // Core Loading Logic
    this.shipments$ = this.shipmentService.getAllShipments().pipe(
      tap(() => {
          // Stops loading on SUCCESS before finalize
          this.isLoading = false;
      }),
      timeout(5000), // Timeout after 5 seconds
      finalize(() => {
        // Ensures spinner stops regardless of success/error path
        if (this.isLoading === true) {
             this.isLoading = false;
        }
      }),
      catchError(err => {
        console.error('API Error:', err);

        if (err.name === 'TimeoutError') {
            this.apiError = 'Connection timed out. The backend server might be off.';
        } else {
            this.apiError = 'Could not fetch shipments. Check backend connection.';
        }

        this.isLoading = false;
        return of([]); // Return an empty array to prevent app crash
      })
    );
  }

  getStatusIcon(status: string): string {
      switch (status.toLowerCase()) {
        case 'created': return 'fa-box-open';
        case 'in transit': return 'fa-shipping-fast';
        case 'out for delivery': return 'fa-route';
        case 'delivered': return 'fa-check-circle';
        default: return 'fa-question-circle';
      }
  }

  navigateToTracking(id: string) {
      this.router.navigate(['/track', id]);
  }
}
