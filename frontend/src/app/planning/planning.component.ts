import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  NonNullableFormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { ShipmentService } from '../core/services/shipment.service';
import { Shipment, ShipmentFormValue } from '../core/models/shipment.model';

// Type-safe form structure
type DimensionsGroup = {
  length: FormControl<number | null>;
  width: FormControl<number | null>;
  height: FormControl<number | null>;
};

type ShipmentFormStructure = {
  origin: FormControl<string>;
  destination: FormControl<string>;
  weight: FormControl<number | null>;
  dimensions: FormGroup<DimensionsGroup>;
  carrier: FormControl<string>;
  specialInstructions: FormControl<string>;
};

@Component({
  selector: 'app-planning',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {
  shipmentForm!: FormGroup<ShipmentFormStructure>;
  isLoading = false;

  origins = ['New York, NY', 'Chicago, IL', 'Los Angeles, CA', 'Houston, TX'];
  destinations = ['Miami, FL', 'Dallas, TX', 'Seattle, WA', 'Phoenix, AZ'];
  carriers = ['Astringer Fleet', 'FedEx', 'UPS', 'DHL'];

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private shipmentService: ShipmentService
  ) {}

  ngOnInit(): void {
    this.shipmentForm = this.fb.group({
      origin: this.fb.control('', Validators.required),
      destination: this.fb.control('', Validators.required),
      weight: this.fb.control<number | null>(null, [Validators.required, Validators.min(1)]),
      dimensions: this.fb.group<DimensionsGroup>({
        length: this.fb.control<number | null>(null, [Validators.required, Validators.min(1)]),
        width: this.fb.control<number | null>(null, [Validators.required, Validators.min(1)]),
        height: this.fb.control<number | null>(null, [Validators.required, Validators.min(1)])
      }),
      carrier: this.fb.control('', Validators.required),
      specialInstructions: this.fb.control('')
    });
  }

  onSubmit(): void {
    if (this.shipmentForm.valid) {
      this.isLoading = true;
      const formData: ShipmentFormValue = this.shipmentForm.getRawValue();

      console.log('Submitting Shipment Data:', formData);

      this.shipmentService.createShipment(formData).subscribe({
        next: (newShipment: Shipment) => {
          console.log('Shipment created successfully:', newShipment.trackingId);
          this.isLoading = false;
          alert(`Shipment successfully planned! Tracking ID: ${newShipment.trackingId}`);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Error creating shipment:', err);
          this.isLoading = false;
          alert('Failed to plan shipment. Check server status or network connection.');
        }
      });
    } else {
      this.shipmentForm.markAllAsTouched();
    }
  }

  get controls(): ShipmentFormStructure {
    return this.shipmentForm.controls;
  }

  get dimensionsGroup(): FormGroup<DimensionsGroup> {
    return this.shipmentForm.get('dimensions') as FormGroup<DimensionsGroup>;
  }
}
