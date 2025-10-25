// src/app/track-detail/track-detail.component.ts (FINALIZED)

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// 💥 FIX 1: Ensure RouterLink is in the imports array, not just the list
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ShipmentService } from '../shipment.service';
// 💥 FIX 2: Import the official TrackingEvent interface alongside Shipment
import { Shipment, TrackingEvent } from '../shipment.model';
import { NotificationService } from '../notification.service'; // 💥 FIX 3: Add NotificationService import
import { Observable, of, switchMap, catchError, tap } from 'rxjs';

// 💥 FIX 4: Removed conflicting local TrackingEvent interface and mock data object
// The data comes directly from the 'Shipment' object fetched from the service.

@Component({
  selector: 'app-track-detail',
  standalone: true,
  imports: [
    CommonModule
],
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.scss']
})
export class TrackDetailComponent implements OnInit {

  shipment$!: Observable<Shipment | undefined>;
  trackingId: string = '';
  isLoading: boolean = true;
  error: string | null = null;
event: any;

  // 💥 Removed mockTrackingHistory as data is fetched from the service/Shipment model.

  constructor(
    private route: ActivatedRoute,
    private shipmentService: ShipmentService,
    private notificationService: NotificationService, // 💥 Inject Notification Service
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
          this.error = 'No shipment ID provided.';
          this.notificationService.error(this.error + ' Redirecting...'); // Use service
          setTimeout(() => this.router.navigate(['/dashboard']), 1500);
          return of(undefined);
        }

        return this.shipmentService.getShipmentById(id).pipe(
          catchError(err => {
            console.error('Fetch Error:', err);
            // Use the actual error message from the mock service if available
            this.error = `Shipment ID "${id}" not found.`;
            this.notificationService.error(this.error + ' Redirecting...');
            setTimeout(() => this.router.navigate(['/dashboard']), 1500);
            return of(undefined);
          })
        );
      }),
      tap(shipment => {
        this.isLoading = false;
        // 💥 Refined error/success handling
        if (shipment) {
            this.notificationService.success(`Tracking details loaded for ${shipment.trackingId}.`);
        }
      })
    );
  }

  copyTrackingId(id: string) {
    navigator.clipboard.writeText(id).then(() => {
      this.notificationService.success('Tracking ID copied to clipboard!'); // Use service
    }).catch(err => {
      this.notificationService.error('Failed to copy ID. Browser clipboard access denied.'); // Use service
      console.error('Copy failed:', err);
    });
  }

  // 💥 FIX 6: Simplified status icon function, relying on official Shipment model status names
  // This function is for the main status display, not the history events.
  getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
      case 'delivered': return 'fa-check-circle';
      case 'out for delivery': return 'fa-route';
      case 'in transit': return 'fa-shipping-fast';
      case 'created': return 'fa-file-alt';
      case 'exception': return 'fa-exclamation-triangle';
      default: return 'fa-dot-circle';
    }
  }

  // 💥 Removed redundant getTrackingHistory and isStatusComplete methods.
  // The template will use shipment.trackingHistory and TrackingEvent.isComplete directly.
}
