// Astringer/frontend/src/app/dashboard/dashboard.component.ts

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'; // <-- RESTORED: ViewChild, ElementRef
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CourierService, Shipment } from '../courier.service';
// FIX: Imported catchError and of for robust error handling
import { Observable, finalize, catchError, of } from 'rxjs';
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

  // RESTORED: Property to hold network error message
  apiError: string | null = null;

  // RESTORED: Get a reference to the input element in the template
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
    this.apiError = null; // Clear previous errors

    // FIX: Added catchError for global API failure handling
    this.shipments$ = this.courierService.getAllShipments().pipe(
      finalize(() => {
        this.isLoading = false;
      }),
      catchError(err => {
        console.error('API Connection Error:', err);
        this.apiError = 'Could not connect to the logistics server. Please ensure the backend is running.';
        // Return an observable of an empty array so the stream completes gracefully
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

      // FIX: Focus the input field on validation error for accessibility
      if (this.trackingInput) {
        this.trackingInput.nativeElement.focus();
      }
    }
  }

  get trackingIdControl() {
    return this.trackingForm.get('trackingId');
  }
}
