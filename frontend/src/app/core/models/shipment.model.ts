// frontend/src/app/core/models/shipment.model.ts

// 1. Export Status Type for use across components (e.g., dashboard, cards)
export type ShipmentStatus = 'In Transit' | 'Delivered' | 'Out for Delivery' | 'Created' | 'Exception';

// ---
// 2. TrackingEvent Interface (The history detail)
export interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string; // ISO date string
  isComplete: boolean; // For visual timeline completion status
}

// ---
// 3. New Interface for Route Capacity (Used for planning/validation)
export interface RouteCapacity {
  date: string; // YYYY-MM-DD
  availableCapacity: number; // e.g. totals tons/TEUs available
  bookedVolume: number; // e.g., total tons/TEUs booked
}

// ---
// 4. Shipment Interface (The main entity)
export interface Shipment {
  id: string;
  trackingId: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  estimatedDelivery: string;
  weight: number;
  carrier: string;
  specialInstructions?: string;
  trackingHistory: TrackingEvent[];
}

// ---
// ✅ 5. ShipmentFormValue Interface (used by PlanningComponent and ShipmentService)
export interface ShipmentFormValue {
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
