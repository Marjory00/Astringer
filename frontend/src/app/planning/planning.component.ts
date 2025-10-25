// src/app/planning/planning.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// 💥 FIX: Importing FormBuilder, FormGroup, Validators, and ReactiveFormsModule
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule // 💥 FIX: Added ReactiveFormsModule
  ],
  templateUrl: './planning.component.html',
  // 💥 FIX: Changed styleUrl to styleUrls (must be an array)
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit { // 💥 FIX: Added OnInit interface

  shipmentForm!: FormGroup; // 💥 FIX: Added FormGroup initialization
  isLoading: boolean = false;

  // Mock data for dropdowns
  origins = ['New York, NY', 'Chicago, IL', 'Los Angeles, CA', 'Houston, TX'];
  destinations = ['Miami, FL', 'Dallas, TX', 'Seattle, WA', 'Phoenix, AZ'];
  carriers = ['Astringer Fleet', 'FedEx', 'UPS', 'DHL'];

  constructor(
    private fb: FormBuilder, // 💥 FIX: Injecting FormBuilder
    private router: Router // 💥 FIX: Injecting Router
  ) { }

  ngOnInit() { // 💥 FIX: Implemented ngOnInit for form initialization
    this.shipmentForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      weight: [null, [Validators.required, Validators.min(1)]],
      dimensions: this.fb.group({
        length: [null, [Validators.required, Validators.min(1)]],
        width: [null, [Validators.required, Validators.min(1)]],
        height: [null, [Validators.required, Validators.min(1)]]
      }),
      carrier: ['', Validators.required],
      specialInstructions: ['']
    });
  }

  onSubmit() { // 💥 FIX: Added onSubmit logic
    if (this.shipmentForm.valid) {
      this.isLoading = true;
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
