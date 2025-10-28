import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  NonNullableFormBuilder,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';

// 1. Define the form value interface
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

// 2. Define the form structure interface
type ShipmentFormStructure = {
  origin: FormControl<string>;
  destination: FormControl<string>;
  weight: FormControl<number | null>;
  dimensions: FormGroup<{
    length: FormControl<number | null>;
    width: FormControl<number | null>;
    height: FormControl<number | null>;
  }>;
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.shipmentForm = this.fb.group({
      origin: this.fb.control('', Validators.required),
      destination: this.fb.control('', Validators.required),
      weight: this.fb.control<number | null>(null, [Validators.required, Validators.min(1)]),
      dimensions: this.fb.group({
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

      console.log('Shipment Data:', formData);

      setTimeout(() => {
        this.isLoading = false;
        alert('Shipment successfully planned! Tracking will begin shortly.');
        this.router.navigate(['/dashboard']);
      }, 2000);
    } else {
      this.shipmentForm.markAllAsTouched();
    }
  }

  get controls(): ShipmentFormStructure {
    return this.shipmentForm.controls;
  }

  get dimensionsGroup(): FormGroup<{
    length: FormControl<number | null>;
    width: FormControl<number | null>;
    height: FormControl<number | null>;
  }> {
    return this.shipmentForm.get('dimensions') as FormGroup<{
      length: FormControl<number | null>;
      width: FormControl<number | null>;
      height: FormControl<number | null>;
    }>;
  }
}
