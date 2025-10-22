// Astringer/frontend/src/app/track-detail/track-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourierService, Shipment } from '../courier.service';
import { Observable, switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-track-detail',
  standalone: true,
  imports: [CommonModule, RouterLink], // RouterLink is correctly imported for the template
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.scss']
})
export class TrackDetailComponent implements OnInit {
  shipment$!: Observable<Shipment | undefined>;

  constructor(
    private route: ActivatedRoute,
    private courierService: CourierService
  ) { }

  ngOnInit() {
    this.shipment$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        // Calls the service method which finds the shipment or returns undefined
        return id ? this.courierService.trackShipment(id) : of(undefined);
      }),
      catchError(err => {
        // Handles network errors or 404s gracefully
        console.error('Shipment error:', err);
        return of(undefined);
      })
    );
  }
}
