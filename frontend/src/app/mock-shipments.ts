// src/app/shipment.service.ts (FINALIZED)

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators'; // 💥 Using switchMap for chaining
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
    return of(MOCK_SHIPMENTS).pipe(
      delay(this.MOCK_LATENCY)
    );
  }

  /**
   * Retrieves a single shipment by its ID or Tracking ID.
   * 💥 FIX: Refactored logic to explicitly check for null and use throwError
   * @param id The shipment ID (internal or tracking ID).
   */
  getShipmentById(id: string): Observable<Shipment> {
    const shipment = MOCK_SHIPMENTS.find(
      s => s.id === id || s.trackingId === id
    );

    // 1. Simulate network delay first
    return of(shipment).pipe(
      delay(this.MOCK_LATENCY),
      // 2. Use switchMap to check the result after the delay
      switchMap(result => {
        if (!result) {
          // If not found, immediately throw an error simulating a 404
          return throwError(() => new Error(`Shipment with ID ${id} not found.`));
        }
        // If found, return the shipment as a new observable
        return of(result as Shipment);
      })
    );
  }

  /**
   * Searches shipments by partial tracking ID or destination.
   * @param query The search term.
   */
  searchShipments(query: string): Observable<Shipment[]> {
    const term = query.toLowerCase().trim();
    if (!term) {
      return this.getAllShipments();
    }

    const filtered = MOCK_SHIPMENTS.filter(s =>
      s.trackingId.toLowerCase().includes(term) ||
      s.destination.toLowerCase().includes(term)
    );

    return of(filtered).pipe(
      delay(this.MOCK_LATENCY)
    );
  }
}
