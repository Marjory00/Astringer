// Astringer/frontend/src/app/courier.service.ts (FINALIZED)

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Shipment {
trackingId: any;
destination: any;
origin: any;
  id: string;
  status: string;
  location: string;
  estimatedDelivery: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourierService {
  private apiUrl = 'http://localhost:3000/api/shipments'; // Verify your backend port!

  constructor(private http: HttpClient) { }

  getAllShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(this.apiUrl);
  }

  trackShipment(id: string): Observable<Shipment | undefined> {
    return this.getAllShipments().pipe(
      map(shipments => shipments.find(s => s.id === id))
    );
  }
}
