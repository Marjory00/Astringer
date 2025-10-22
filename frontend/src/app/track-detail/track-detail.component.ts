// Astringer/frontend/src/app/track-detail/track-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// V--- Router is included for redirection logic V
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CourierService, Shipment } from '../courier.service';
// Ensure all RxJS operators are imported correctly
import { Observable, switchMap, catchError, of, tap } from 'rxjs';
import { StatusClassPipe } from '../status-class.pipe';

@Component({
  selector: 'app-track-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusClassPipe],
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.scss']
})
export class TrackDetailComponent implements OnInit {
  shipment$!: Observable<Shipment | undefined>;

  // V--- Check this area: Do NOT use TemplateRef here V
  // E.g., DO NOT have a line like: @ViewChild('someRef') someRef!: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private courierService: CourierService,
    private router: Router
  ) { }

  ngOnInit() {
    this.shipment$ = this.route.paramMap.pipe(
      // ... (rest of the logic is correct)
      switchMap(params => {
        const id = params.get('id');
        return id ? this.courierService.trackShipment(id) : of(undefined);
      }),
      tap(shipment => {
        if (shipment === undefined) {
          console.warn('Redirecting: Shipment ID not found or invalid.');
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1500);
        }
      }),
      catchError(err => {
        console.error('Shipment API Error:', err);
        this.router.navigate(['/']);
        return of(undefined);
      })
    );
  }
}
