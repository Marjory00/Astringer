// frontend/src/app/core/services/shipment.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shipment } from '../models/shipment.model'; // Assuming this path now works

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  
  private apiUrl = 'http://localhost:3000/api/shipments';

  constructor(private http: HttpClient) { }

  /**
   * Sends new shipment data to the backend API to create a new shipment record.
   * @param shipmentData The raw form data (ShipmentFormValue) from the planning component.
   * @returns An Observable of the created Shipment object, including the new trackingId.
   */
  createShipment(shipmentData: any): Observable<Shipment> {
    // This defines the missing method and resolves TS2339.
    return this.http.post<Shipment>(this.apiUrl, shipmentData);
  }

  // You will add other methods here later (e.g., getAllShipments, getShipmentById)
}