// src/app/track-detail/track-detail.component.ts (FINALIZED & CLEAN)

import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router'; // <<-- RouterLink removed from import
import { ShipmentService } from '../core/services/shipment.service';

import { Shipment, TrackingEvent } from '../shipment.model';
import { NotificationService } from '../core/services/notification.service';
import { Observable, of, switchMap, catchError, tap } from 'rxjs';
import * as L from 'leaflet';


@Component({
  selector: 'app-track-detail',
  standalone: true,
  imports: [
    CommonModule,
    // RouterLink removed from imports array to prevent compilation error
  ],
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.scss']
})
export class TrackDetailComponent implements OnInit, AfterViewInit, OnDestroy {

  shipment$!: Observable<Shipment | undefined>;
  trackingId: string = '';
  isLoading: boolean = true;
  error: string | null = null;
  event: any;

  // --- MAP PROPERTIES ---
  private map: L.Map | undefined;

  // Dummy coordinates for demonstration
  private originCoord: L.LatLngTuple = [38.9072, -77.0369]; // Washington D.C.
  private currentCoord: L.LatLngTuple = [39.2904, -76.6122]; // Baltimore, MD (Last recorded point)
  private destinationCoord: L.LatLngTuple = [40.7128, -74.0060]; // New York, NY
  // ----------------------


  constructor(
    private route: ActivatedRoute,
    private shipmentService: ShipmentService,
    private notificationService: NotificationService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.shipment$ = this.route.paramMap.pipe(
      tap(params => {
        this.trackingId = params.get('id') || '';
        this.isLoading = true;
        this.error = null;
      }),
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          this.error = 'No shipment ID provided.';
          this.notificationService.error(this.error + ' Redirecting...');
          setTimeout(() => this.router.navigate(['/dashboard']), 1500);
          return of(undefined);
        }

        return this.shipmentService.getShipmentById(id).pipe(
          catchError(err => {
            console.error('Fetch Error:', err);
            this.error = `Shipment ID "${id}" not found.`;
            this.notificationService.error(this.error + ' Redirecting...');
            setTimeout(() => this.router.navigate(['/dashboard']), 1500);
            return of(undefined);
          })
        );
      }),
      tap(shipment => {
        this.isLoading = false;
        if (shipment) {
            this.notificationService.success(`Tracking details loaded for ${shipment.trackingId}.`);
            // Map logic would ideally be updated here
        }
      })
    );
  }

  // --- LIFECYCLE HOOKS FOR MAP ---

  ngAfterViewInit(): void {
    // Ensures the map initializes only after the HTML view (div#tracking-map) is ready
    setTimeout(() => {
        this.initializeMap();
    }, 50);
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove(); // Clean up the map instance to prevent memory leaks
    }
  }

  // --- MAP INITIALIZATION LOGIC ---

  private initializeMap(): void {
    if (!this.map && document.getElementById('tracking-map')) {

        // 1. Initialize the map
        this.map = L.map('tracking-map').setView(this.currentCoord, 7);

        // 2. Add the base map tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 3,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        // 3. Define the path (A polyline between the points)
        const routePath = L.polyline(
            [this.originCoord, this.currentCoord, this.destinationCoord],
            { color: '#004d99', weight: 5, dashArray: '10, 5' }
        ).addTo(this.map);

        // 4. Define custom icons using Font Awesome
        const customIcon = (iconClass: string, color: string) => L.divIcon({
            className: 'custom-div-icon',
            html: `<i class="fas fa-2x ${iconClass}" style="color: ${color};"></i>`,
            iconSize: [30, 42],
            iconAnchor: [15, 42],
            popupAnchor: [0, -42]
        });

        // 5. Add markers to the map
        L.marker(this.originCoord, { icon: customIcon('fa-warehouse', '#4CAF50') }) // Green
            .addTo(this.map)
            .bindPopup('Origin').openPopup();

        L.marker(this.destinationCoord, { icon: customIcon('fa-home', '#FFC107') }) // Orange
            .addTo(this.map)
            .bindPopup('Destination');

        L.marker(this.currentCoord, { icon: customIcon('fa-truck-moving', '#004d99') }) // Blue
            .addTo(this.map)
            .bindPopup('Current Location: In Transit').openPopup();


        // 6. Adjust the map view to fit the entire route
        this.map.fitBounds(routePath.getBounds(), { padding: [50, 50] });
    }
  }
  // ---------------------------------


  copyTrackingId(id: string) {
    navigator.clipboard.writeText(id).then(() => {
      this.notificationService.success('Tracking ID copied to clipboard!');
    }).catch(err => {
      this.notificationService.error('Failed to copy ID. Browser clipboard access denied.');
      console.error('Copy failed:', err);
    });
  }

  getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
      case 'delivered': return 'fa-check-circle';
      case 'out for delivery': return 'fa-route';
      case 'in transit': return 'fa-shipping-fast';
      case 'created': return 'fa-file-alt';
      case 'exception': return 'fa-exclamation-triangle';
      default: return 'fa-dot-circle';
    }
  }
}
