// src/app/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ShipmentService } from '../core/services/shipment.service';
import { Shipment } from '../../../../backend/src/models/shipment.model';
import { Observable, finalize, catchError, of, timeout, tap } from 'rxjs';
// Assuming StatusClassPipe is a custom pipe and has been created
import { StatusClassPipe } from "../status-class.pipe";

// 💥 NEW: Interface for System Health Data
export interface SystemHealth {
  name: string;
  status: 'Operational' | 'Degraded' | 'Offline' | 'Unknown';
  latency: number;
}

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

  // 💥 FIX: Define systemHealth with mock data
  systemHealth: SystemHealth[] = [
    { name: 'WMS (Warehouse)', status: 'Operational', latency: 45 },
    { name: 'TMS (Routing)', status: 'Operational', latency: 60 },
    { name: 'Customer API', status: 'Degraded', latency: 250 },
    { name: 'Billing Service', status: 'Operational', latency: 30 },
    { name: 'Last-Mile App', status: 'Offline', latency: 0 }
  ];

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
          this.isLoading = false;
      }),
      timeout(5000),
      finalize(() => {
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
        return of([]);
      })
    );
  }

  // 💥 FIX: Implemented method to get the SCSS class name for health status
  getHealthClass(status: string): string {
    switch (status) {
      case 'Operational': return 'operational';
      case 'Degraded': return 'degraded';
      case 'Offline': return 'offline';
      default: return 'unknown';
    }
  }

  // 💥 FIX: Implemented method to get the Font Awesome icon for health status
  getHealthIcon(status: string): string {
    switch (status) {
      case 'Operational': return 'fa-check-circle';
      case 'Degraded': return 'fa-exclamation-triangle';
      case 'Offline': return 'fa-times-circle';
      default: return 'fa-question-circle';
    }
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
