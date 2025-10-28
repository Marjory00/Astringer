// frontend/src/app/dashboard/dashboard.component.ts (FINALIZED PROFESSIONAL ENHANCEMENTS)

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
// 💥 NEW IMPORTS: switchMap and startWith are crucial for the search/merge logic
import { Observable, of, Subject } from 'rxjs';
import { catchError, finalize, tap, timeout, map, debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';

import { ShipmentService } from '../core/services/shipment.service';
import { Shipment } from '../core/models/shipment.model';
import { StatusClassPipe } from '../status-class.pipe';

// --- INTERFACES ---
export interface SystemHealth {
  name: string;
  status: 'Operational' | 'Degraded' | 'Offline' | 'Unknown';
  latency: number;
}

// 💥 NEW: Interface for Operational KPIs
export interface OperationalKPI {
    title: string;
    value: string;
    icon: string;
    trend: 'up' | 'down' | 'stable';
    colorClass: string;
}

// --- COMPONENT METADATA ---
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

  // --- DATA PROPERTIES ---
  systemHealth: SystemHealth[] = [
    { name: 'WMS (Warehouse)', status: 'Operational', latency: 45 },
    { name: 'TMS (Routing)', status: 'Operational', latency: 60 },
    { name: 'Customer API', status: 'Degraded', latency: 250 },
    { name: 'Billing Service', status: 'Operational', latency: 30 },
    { name: 'Last-Mile App', status: 'Offline', latency: 0 }
  ];

  // 💥 NEW: Activity Log Data
  recentActivity = [
    { time: '12:05 PM', type: 'System', message: 'User Alice logged in.', icon: 'fa-user' },
    { time: '11:45 AM', type: 'Planning', message: 'New Route HOU-MIA optimized.', icon: 'fa-route' },
    { time: '11:00 AM', type: 'WMS', message: 'Warehouse W-1 sync completed.', icon: 'fa-warehouse' },
    { time: '10:30 AM', type: 'Error', message: 'Billing API: Connection failed.', icon: 'fa-times-circle' },
  ];

  // --- OBSERVABLES ---
  // Shipments status distribution (count of each status type)
  kpiData$!: Observable<{ status: string; count: number; cssClass: string }[]>;

  // 💥 NEW: Operational KPIs (On-time, Weight, Exception Rate)
  operationalKpi$!: Observable<OperationalKPI[]>;

  // Subject for search input handling
  searchTerms = new Subject<string>();

  // The final array used to render the table (filtered or full)
  displayShipments$!: Observable<Shipment[]>;

  // --- STATE ---
  isLoading = true;
  apiError: string | null = null;

  constructor(
    private shipmentService: ShipmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apiError = null;

    // 1. Initial Load and Error Handling
    const initialShipments$ = this.shipmentService.getAllShipments().pipe(
      timeout(10000),
      tap(() => {
        this.isLoading = false;
      }),
      catchError(err => {
        console.error('API Error:', err);
        this.apiError = err.name === 'TimeoutError'
          ? 'Connection timed out. The backend server might be off.'
          : 'Could not fetch shipments. Check backend connection.';
        this.isLoading = false;
        return of([]);
      })
    );

    // 2. Setup Search Observable (Returns filtered list or full list)
    const searchResult$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.shipmentService.searchShipments(term)),
      catchError(err => {
        console.error('Search API Error:', err);
        this.apiError = 'Error during search operation.';
        return of([]);
      })
    );

    // 3. Merge: displayShipments$ starts with the initial load, then uses search results
    this.displayShipments$ = initialShipments$.pipe(
      switchMap(initialResults =>
        searchResult$.pipe(
          startWith(initialResults)
        )
      )
    );

    // 4. Setup Shipment Status KPI Data
    this.kpiData$ = initialShipments$.pipe(
      map(shipments => {
        if (shipments.length === 0) return [];

        const distribution = shipments.reduce((acc, shipment) => {
          acc[shipment.status] = (acc[shipment.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const getStatusClass = (status: string) => {
          switch (status) {
            case 'Delivered': return 'bg-success';
            case 'Exception': return 'bg-danger';
            case 'In Transit': return 'bg-primary';
            default: return 'bg-secondary';
          }
        };

        return Object.keys(distribution).map(status => ({
          status: status,
          count: distribution[status],
          cssClass: getStatusClass(status)
        }));
      })
    );

    // 💥 5. Setup Operational Performance Metrics
    this.operationalKpi$ = initialShipments$.pipe(
        map(shipments => {
            if (shipments.length === 0) return [];

            const totalCount = shipments.length;

            // 1. Delivery Performance (On-Time Delivery Rate)
            const delivered = shipments.filter(s => s.status === 'Delivered').length;
            // Mock logic: Assume 90% of delivered shipments were on time
            const onTimeDeliveries = Math.round(delivered * 0.9);
            const onTimeRate = delivered > 0 ? (onTimeDeliveries / delivered) * 100 : 0;

            // 2. Average Weight
            const totalWeight = shipments.reduce((sum, s) => sum + s.weight, 0);
            const avgWeight = totalCount > 0 ? (totalWeight / totalCount) : 0;

            // 3. Exception Rate
            const exceptions = shipments.filter(s => s.status === 'Exception').length;
            const exceptionRate = (exceptions / totalCount) * 100;

            return [
                {
                    title: 'On-Time Delivery Rate',
                    value: `${onTimeRate.toFixed(1)}%`,
                    icon: 'fa-calendar-check',
                    trend: 'stable',
                    colorClass: 'bg-kpi-success'
                },
                {
                    title: 'Avg. Shipment Weight',
                    value: `${avgWeight.toFixed(2)} kg`,
                    icon: 'fa-weight-hanging',
                    trend: 'up', // Higher average weight often indicates better load factors
                    colorClass: 'bg-kpi-info'
                },
                {
                    title: 'Exception Rate',
                    value: `${exceptionRate.toFixed(1)}%`,
                    icon: 'fa-exclamation-circle',
                    trend: 'down', // Lower is better
                    colorClass: 'bg-kpi-danger'
                }
            ];
        })
    );
  }

  // --- UTILITY METHODS ---

  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.searchTerms.next(term);
  }

  getHealthClass(status: SystemHealth['status']): string {
    switch (status) {
      case 'Operational': return 'operational';
      case 'Degraded': return 'degraded';
      case 'Offline': return 'offline';
      default: return 'unknown';
    }
  }

  getHealthIcon(status: SystemHealth['status']): string {
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

  navigateToTracking(id: string): void {
    this.router.navigate(['/track', id]);
  }
}
