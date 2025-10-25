// src/app/track-detail/track-detail.component.ts (FINAL FIX)

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ShipmentService } from '../shipment.service';
import { Shipment } from '../shipment.model';
// Removed unused imports map, finalize (as they weren't used in the logic)
import { Observable, of, switchMap, catchError, tap } from 'rxjs';

// Mock interface for detailed tracking history
interface TrackingEvent {
  date: string; // Date or DateTime string
  location: string;
  status: string;
}

@Component({
  selector: 'app-track-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.scss']
})
export class TrackDetailComponent implements OnInit {

  shipment$!: Observable<Shipment | undefined>;
  trackingId: string = '';
  isLoading: boolean = true;
  error: string | null = null;

  mockTrackingHistory: { [key: string]: TrackingEvent[] } = {
    '1': [
      { date: '2025-10-20 10:00 AM', location: 'New York, NY', status: 'Shipment Created' },
      { date: '2025-10-20 02:30 PM', location: 'JFK Hub', status: 'Departed Origin Facility' },
      { date: '2025-10-21 08:45 AM', location: 'Chicago, IL', status: 'In Transit' },
      { date: '2025-10-22 03:15 PM', location: 'Dallas, TX', status: 'Arrived at Destination Hub' },
      { date: '2025-10-23 07:00 AM', location: 'Dallas, TX', status: 'Out for Delivery' },
    ],
    '3': [
      { date: '2025-10-15 10:00 AM', location: 'LA, CA', status: 'Shipment Created' },
      { date: '2025-10-18 09:00 AM', location: 'Miami, FL', status: 'Arrived at Destination Hub' },
      { date: '2025-10-18 02:00 PM', location: 'Customer Address', status: 'Delivered' },
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private shipmentService: ShipmentService,
    // 💥 FIX APPLIED HERE: Changed 'private' to 'public' to allow template access
    public router: Router,
  ) { }

  ngOnInit() {
    this.shipment$ = this.route.paramMap.pipe(
      tap(params => {
        this.trackingId = params.get('id') || '';
        this.isLoading = true;
        this.error = null;
      }),
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          this.error = 'No shipment ID provided. Redirecting...';
          setTimeout(() => this.router.navigate(['/dashboard']), 1500);
          return of(undefined);
        }

        return this.shipmentService.getShipmentById(id).pipe(
          catchError(err => {
            console.error('Fetch Error:', err);
            this.error = 'Shipment not found or API error. Redirecting...';
            setTimeout(() => this.router.navigate(['/dashboard']), 1500);
            return of(undefined);
          })
        );
      }),
      tap(shipment => {
        this.isLoading = false;
        if (!shipment && !this.error) {
           this.error = 'Shipment ID not found. Redirecting...';
           setTimeout(() => this.router.navigate(['/dashboard']), 1500);
        }
      })
    );
  }

  copyTrackingId(id: string) {
    navigator.clipboard.writeText(id).then(() => {
      alert('Tracking ID copied to clipboard!');
    }).catch(err => {
      alert('Failed to copy ID. Browser clipboard access denied.');
      console.error('Copy failed:', err);
    });
  }

  getTrackingHistory(shipmentId: string | undefined): TrackingEvent[] {
    if (!shipmentId) return [];
    return this.mockTrackingHistory[shipmentId] || this.mockTrackingHistory['1'] || [];
  }

  getStatusIcon(status: string): string {
      switch (status.toLowerCase()) {
        case 'shipment created': return 'fa-clipboard-list';
        case 'departed origin facility': return 'fa-plane-departure';
        case 'in transit': return 'fa-shipping-fast';
        case 'arrived at destination hub': return 'fa-warehouse';
        case 'out for delivery': return 'fa-route';
        case 'delivered': return 'fa-box-open';
        default: return 'fa-dot-circle';
      }
  }

  isStatusComplete(status: string): boolean {
    return status.toLowerCase() !== 'shipment created' && status.toLowerCase() !== 'in transit';
  }
}
