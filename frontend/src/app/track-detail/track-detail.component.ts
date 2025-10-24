// Astringer/frontend/src/app/track-detail/track-detail.component.ts (FINALIZED)

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CourierService, Shipment } from '../courier.service';
import { Observable, switchMap, catchError, of, tap } from 'rxjs';
import { StatusClassPipe } from '../status-class.pipe';
import { NotificationService } from '../notification.service'; // <-- Used for Copy ID feedback

@Component({
  selector: 'app-track-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusClassPipe],
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.scss']
})
export class TrackDetailComponent implements OnInit {
  shipment$!: Observable<Shipment | undefined>;

  constructor(
    private route: ActivatedRoute,
    private courierService: CourierService,
    private router: Router,
    private notificationService: NotificationService // <-- Injected NotificationService
  ) { }

  ngOnInit() {
    this.shipment$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        // If ID is missing, return Observable of undefined
        return id ? this.courierService.trackShipment(id) : of(undefined);
      }),
      // Handle "Not Found" scenario (shipment is undefined)
      tap(shipment => {
        if (shipment === undefined) {
          console.warn('Redirecting: Shipment ID not found or invalid.');
          // Provide a brief pause before redirecting for the user to read the message
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1500);
        }
      }),
      // Handle catastrophic API failure (service error)
      catchError(err => {
        console.error('Shipment API Error:', err);
        // Display a general error notification
        this.notificationService.show('Failed to load shipment details due to a server error.', 'error');
        this.router.navigate(['/']); // Redirect on error
        return of(undefined);
      })
    );
  }

  /**
   * Copies the tracking ID to the user's clipboard and provides visual feedback.
   * @param id The tracking ID string to copy.
   */
  copyTrackingId(id: string) {
    // navigator.clipboard is the modern, promise-based API
    navigator.clipboard.writeText(id).then(() => {
      this.notificationService.show('Tracking ID copied to clipboard!', 'success');
    }).catch(err => {
      this.notificationService.show('Failed to copy ID. Browser clipboard access denied.', 'error');
      console.error('Copy failed:', err);
    });
  }
}
