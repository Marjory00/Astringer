// Astringer/frontend/src/app/track-detail/track-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CourierService, Shipment } from '../courier.service';
import { Observable, switchMap, catchError, of } from 'rxjs';
import { StatusClassPipe } from '../status-class.pipe'; // <-- NEW IMPORT


@Component({
  selector: 'app-track-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusClassPipe], // RouterLink is correctly imported for the template
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.scss']
})
export class TrackDetailComponent implements OnInit {
  shipment$!: Observable<Shipment | undefined>;
notFound: TemplateRef<NgIfContext<Shipment|null|undefined>>|null;

  constructor(
    private route: ActivatedRoute,
    private courierService: CourierService,
    private router: Router // <-- Inject Router
  ) { }

  ngOnInit() {
    this.shipment$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        // Calls the service method which finds the shipment or returns undefined
        return id ? this.courierService.trackShipment(id) : of(undefined);
      }),
      // V--- NEW: Intercept the result before it reaches the template V
      tap(shipment => {
        // If the service returned undefined (shipment not found)
        if (shipment === undefined) {
          // Log a user-friendly message
          console.warn('Redirecting: Shipment ID not found or invalid.');

          // Redifrect the user back to the dashboard after a short delay
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1500); // 1.5 second delay so the user sees the "Not Found" message briefly
          }

      }),
      catchError(err => {
        // Log the technical error
        console.error('Shipment API Error:', err);
        // Redirect inmediately on a critical network error
        this.router.navigate(['/']);
        return of(undefined);
      })
    );
  }
}
