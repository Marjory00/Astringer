// Astringer/frontend/src/app/dashboard/dashboard.component.ts (FINALIZED with Timeout)

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CourierService, Shipment } from '../courier.service';
// FIX: Imported timeout for production robustness
import { Observable, finalize, catchError, of, timeout } from 'rxjs';
import { StatusClassPipe } from '../status-class.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    StatusClassPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  shipments$!: Observable<Shipment[]>;
  isLoading: boolean = true;

  apiError: string | null = null;

  @ViewChild('trackingInput') trackingInput!: ElementRef;

  trackingForm!: FormGroup;

  constructor(
    private courierService: CourierService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.trackingForm = this.fb.group({
      trackingId: ['', [
        Validators.required,
        Validators.pattern(/^AST\d{6}$/) // e.g., AST123456
      ]]
    });

    this.isLoading = true;
    this.apiError = null;

    // Auto-transform input for better UX/validation
    this.trackingForm.get('trackingId')?.valueChanges.subscribe(value => {
      if (value && typeof value === 'string') {
        const transformedValue = value.trim().toUpperCase();

        if (value !== transformedValue) {
          this.trackingForm.get('trackingId')?.setValue(transformedValue, { emitEvent: false });
        }
      }
    });

    this.shipments$ = this.courierService.getAllShipments().pipe(
      // FIX: Add timeout to prevent infinite loading state
      timeout(5000),
      finalize(() => {
        this.isLoading = false;
      }),
      catchError(err => {
        console.error('API Connection Error:', err);

        if (err.name === 'TimeoutError') {
             this.apiError = 'Connection timed out (5s limit reached). The server may be unreachable.';
        } else {
             this.apiError = 'Could not connect to the logistics server. Please ensure the backend is running.';
        }
        return of([]);
      })
    );
  }

  searchTrackingId() {
    if (this.trackingForm.valid) {
      const id = this.trackingForm.value.trackingId.trim().toUpperCase();
      this.router.navigate(['/track', id]);
      this.trackingForm.reset();
    } else {
      this.trackingForm.get('trackingId')?.markAsTouched();
      console.warn('Invalid Tracking ID entered.');

      if (this.trackingInput) {
        this.trackingInput.nativeElement.focus();
      }
    }
  }

  get trackingIdControl() {
    return this.trackingForm.get('trackingId');
  }
}
