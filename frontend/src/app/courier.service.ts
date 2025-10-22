// Astringer/frontend/src/app/courier.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// FIX: map is correctly imported from 'rxjs/operators'
import { map } from 'rxjs/operators';

// V--- FIX: Define specific types for safety and clarity V
export interface Shipment {
  id: string; // Should be string, matches URL parameter type
  status: string; // Status is a string (e.g., 'In Transit 🚚')
  location: string; // <-- FIX: This was missing or incorrectly defined
  estimatedDelivery: string; // Should be a string (date format)
}

@Injectable({
  providedIn: 'root'
})
export class CourierService {
  private apiUrl = 'http://localhost:3000/api/shipments';

  constructor(private http: HttpClient) { } // <-- FIX: Constructor added for completeness

  // FIX: This method is required by trackShipment, so it's included here for completeness
  getAllShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(this.apiUrl);
  }

  trackShipment(id: string): Observable<Shipment | undefined> {
    return this.getAllShipments().pipe(
      // The map operator is correctly used to find the item
      map(shipments => shipments.find(s => s.id === id))
    );
  }
}
