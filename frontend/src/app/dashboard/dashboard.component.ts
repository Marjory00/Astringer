// Astringer/frontend/src/app/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// V--- Only import Router for the component's logic (used in the constructor) V
import { Router, RouterLink } from '@angular/router';
import { CourierService, Shipment } from '../courier.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // V--- RouterLink is imported here for the template's use V
  imports: [
    CommonModule,
    FormsModule
],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  shipments$!: Observable<Shipment[]>;
  trackingId: string = '';

  constructor(
    private courierService: CourierService,
    private router: Router // <-- Router is used here, so it's a valid import
  ) { }

  ngOnInit() {
    this.shipments$ = this.courierService.getAllShipments();
  }

  searchTrackingId() {
    if (this.trackingId.trim()) {
      this.router.navigate(['/track', this.trackingId.trim()]);
      this.trackingId = '';
    }
  }
}
