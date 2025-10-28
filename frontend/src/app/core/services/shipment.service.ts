import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

import { Shipment, ShipmentFormValue } from '../models/shipment.model';
import { MOCK_SHIPMENTS } from '../../data/mock-shipments';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private readonly MOCK_LATENCY = 300;
  private shipments: Shipment[] = [...MOCK_SHIPMENTS];
  private trackingIdCounter: number;

  constructor() {
    console.log('Initializing ShipmentService...');
  console.log('Initial shipment count:', this.shipments.length);

    const maxId = this.shipments.reduce((max, s) => {
      const match = s.trackingId.match(/\d+/);
      const num = match ? parseInt(match[0], 10) : 0;
      return Math.max(max, num);
    }, 100000);
    this.trackingIdCounter = maxId + 1;
  }

  /**
   * Returns all mock shipments.
   */
  getAllShipments(): Observable<Shipment[]> {
    return of([...this.shipments]).pipe(delay(this.MOCK_LATENCY));
  }

  /**
   * Creates a new shipment and adds it to the mock store.
   */
  createShipment(shipmentData: ShipmentFormValue): Observable<Shipment> {
    const newTrackingId = `AST${this.trackingIdCounter++}`;
    const newShipmentId = Date.now().toString();

    const newShipment: Shipment = {
      id: newShipmentId,
      trackingId: newTrackingId,
      origin: shipmentData.origin,
      destination: shipmentData.destination,
      weight: shipmentData.weight ?? 0,
      carrier: shipmentData.carrier,
      specialInstructions: shipmentData.specialInstructions || '',
      status: 'Created',
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      trackingHistory: [
        {
          status: 'Shipment created and validated',
          location: shipmentData.origin,
          timestamp: new Date().toISOString(),
          isComplete: false
        }
      ]
    };

    this.shipments.push(newShipment);

    return of(newShipment).pipe(delay(this.MOCK_LATENCY));
  }

  /**
   * Retrieves a shipment by ID or tracking ID.
   */
  getShipmentById(id: string): Observable<Shipment> {
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
   * Searches shipments by tracking ID, origin, destination, or carrier.
   */
  searchShipments(query: string): Observable<Shipment[]> {
    const term = query.toLowerCase().trim();
    if (!term) return this.getAllShipments();

    const filtered = this.shipments.filter(s =>
      s.trackingId.toLowerCase().includes(term) ||
      s.origin.toLowerCase().includes(term) ||
      s.destination.toLowerCase().includes(term) ||
      s.carrier.toLowerCase().includes(term)
    );

    return of([...filtered]).pipe(delay(this.MOCK_LATENCY));
  }
}
