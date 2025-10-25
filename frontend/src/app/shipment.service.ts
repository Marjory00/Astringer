// src/app/shipment.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shipment } from './shipment.model';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private apiUrl = 'http://localhost:3000/api/shipments'; // 💥 Backend API URL

  constructor(private http: HttpClient) { }

  getAllShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(this.apiUrl);
  }

  getShipmentById(id: string): Observable<Shipment> {
    return this.http.get<Shipment>(`${this.apiUrl}/${id}`);
  }
}
