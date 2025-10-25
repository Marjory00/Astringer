// src/app/shipment.service.ts (FINALIZED, Cast Fix)

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { Shipment } from './shipment.model';
import { MOCK_SHIPMENTS } from './mock-shipments';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  private readonly MOCK_LATENCY = 300;

  constructor() { }

  /**
   * Retrieves all shipments from the mock data.
   */
  getAllShipments(): Observable<Shipment[]> {
    // 💥 FIX: Casting MOCK_SHIPMENTS as Shipment[] to satisfy compiler type checks across files
    return of(MOCK_SHIPMENTS as Shipment[]).pipe(
      delay(this.MOCK_LATENCY)
    );
  }

  /**
   * Retrieves a single shipment by its ID or Tracking ID.
   */
  getShipmentById(id: string): Observable<Shipment> {
    // Find operation on the explicitly typed array
    const shipment = (MOCK_SHIPMENTS as Shipment[]).find(
      s => s.id === id || s.trackingId === id
    );

    return of(shipment).pipe(
      delay(this.MOCK_LATENCY),
      switchMap(result => {
        if (!result) {
          return throwError(() => new Error(`Shipment with ID ${id} not found.`));
        }
        return of(result); // result is guaranteed to be Shipment here
      })
    );
  }

  /**
   * Searches shipments by partial tracking ID or destination.
   */
  searchShipments(query: string): Observable<Shipment[]> {
    const term = query.toLowerCase().trim();
    if (!term) {
      return this.getAllShipments();
    }

    const filtered = (MOCK_SHIPMENTS as Shipment[]).filter(s =>
      s.trackingId.toLowerCase().includes(term) ||
      s.destination.toLowerCase().includes(term)
    );

    return of(filtered).pipe(
      delay(this.MOCK_LATENCY)
    );
  }
}
