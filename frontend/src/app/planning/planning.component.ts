// src/app/planning/planning.component.ts (TYPE-SAFE ENHANCEMENT)

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Define a TypeScript interface for the form structure for strong typing
interface ShipmentFormValue {
  origin: string;
  destination: string;
  weight: number | null;
  dimensions: {
    length: number | null;
    width: number | null;
    height: number | null;
  };
  carrier: string;
  specialInstructions: string;
}

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {

  // ✨ ENHANCEMENT: Typed FormGroup using the defined interface
  shipmentForm!: FormGroup<ShipmentFormValue>;
  isLoading: boolean = false;

  // Mock data for dropdowns
  origins = ['New York, NY', 'Chicago, IL', 'Los Angeles, CA', 'Houston, TX'];
  destinations = ['Miami, FL', 'Dallas, TX', 'Seattle, WA', 'Phoenix, AZ'];
  carriers = ['Astringer Fleet', 'FedEx', 'UPS', 'DHL'];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    // Using the type-safe group method
    this.shipmentForm = this.fb.group<ShipmentFormValue>({
      origin: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      destination: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      // Note: Using null as initial state for number inputs is common
      weight: this.fb.control(null, { validators: [Validators.required, Validators.min(1)] }),
      dimensions: this.fb.group({
        length: this.fb.control(null, { validators: [Validators.required, Validators.min(1)] }),
        width: this.fb.control(null, { validators: [Validators.required, Validators.min(1)] }),
        height: this.fb.control(null, { validators: [Validators.required, Validators.min(1)] })
      }),
      carrier: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      specialInstructions: this.fb.control('', { nonNullable: true })
    });
  }

  onSubmit() {
    if (this.shipmentForm.valid) {
      this.isLoading = true;
      // The value here is now strongly typed as ShipmentFormValue
      const formData = this.shipmentForm.value;

      console.log('Shipment Data:', formData);

      // Simulating API call for 2 seconds
      setTimeout(() => {
        this.isLoading = false;
        alert('Shipment successfully planned! Tracking will begin shortly.');
        this.router.navigate(['/dashboard']);
      }, 2000);

    } else {
      // Mark all fields as touched to display validation errors
      this.shipmentForm.markAllAsTouched();
    }
  }

  // Convenience getter for easy access to form controls
  get controls() {
    return this.shipmentForm.controls;
  }
}
