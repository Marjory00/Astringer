// src/app/shipment.service.ts (IMPROVED, Single Type Assertion)

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { Shipment } from '../../shipment.model';
import { MOCK_SHIPMENTS } from '../../data/mock-shipments';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  private readonly MOCK_LATENCY = 300;

  // ✨ FIX/IMPROVEMENT: Store the MOCK_SHIPMENTS data as a strongly-typed private property.
  // This ensures the type assertion is done only once, making method implementations cleaner.
  private readonly shipments: Shipment[] = MOCK_SHIPMENTS as Shipment[];

  constructor() { }

  /**
   * Retrieves all shipments from the mock data.
   */
  getAllShipments(): Observable<Shipment[]> {
    // Now we use the strongly-typed 'this.shipments' property
    return of(this.shipments).pipe(
      delay(this.MOCK_LATENCY)
    );
  }

  /**
   * Retrieves a single shipment by its ID or Tracking ID.
   */
  getShipmentById(id: string): Observable<Shipment> {
    // Use the clean, strongly-typed property
    const shipment = this.shipments.find(
      s => s.id === id || s.trackingId === id
    );

    return of(shipment).pipe(
      delay(this.MOCK_LATENCY),
      switchMap(result => {
        if (!result) {
          return throwError(() => new Error(`Shipment with ID ${id} not found.`));
        }
        return of(result);
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

    // Use the clean, strongly-typed property
    const filtered = this.shipments.filter(s =>
      s.trackingId.toLowerCase().includes(term) ||
      s.destination.toLowerCase().includes(term)
    );

    return of(filtered).pipe(
      delay(this.MOCK_LATENCY)
    );
  }
}
