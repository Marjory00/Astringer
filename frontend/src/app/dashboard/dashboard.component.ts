// Astringer/frontend/src/app/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// FIX: Removed redundant 'FormsModule'. Retained Reactive Forms modules.
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CourierService, Shipment } from '../courier.service';
import { Observable, finalize } from 'rxjs';
import { StatusClassPipe } from '../status-class.pipe'; // <-- NEW IMPORT

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // FIX: Clean imports. Removed the erroneous comma and period.
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,  // <-- CORRECTED SYNTAX
    StatusClassPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  shipments$!: Observable<Shipment[]>;
  isLoading: boolean = true;

  // FormGroup is correctly defined and will be initialized in ngOnInit
  trackingForm!: FormGroup;

  // FormBuilder is correctly injected
  constructor(
    private courierService: CourierService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // Form initialization is correct with required and pattern validators
    this.trackingForm = this.fb.group({
      trackingId: ['', [
        Validators.required,
        Validators.pattern(/^AST\d{6}$/) // e.g., AST123456
      ]]
    });

    // Loading state logic using finalize is correct
    this.shipments$ = this.courierService.getAllShipments().pipe(
      finalize(() => {
        this.isLoading = false;
      })
    );
  }

  // searchTrackingId logic is correct: checks validity before navigating
  searchTrackingId() {
    if (this.trackingForm.valid) {
      const id = this.trackingForm.value.trackingId.trim().toUpperCase();
      this.router.navigate(['/track', id]);

      // Resets the form after successful submission
      this.trackingForm.reset();
    } else {
      // Correctly marks the control as touched to trigger error messages in HTML
      this.trackingForm.get('trackingId')?.markAsTouched();
      console.warn('Invalid Tracking ID entered.');
    }
  }

  // Helper getter is correct for clean template access
  get trackingIdControl() {
    return this.trackingForm.get('trackingId');
  }
}
