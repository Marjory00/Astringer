// src/app/shipment.model.ts (FIXED AND CLEANED)

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
// 3. New Interface for Route Capacity
// ✨ FIX: This interface must be defined at the top level, not inside Shipment.
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

    // Summary status for display in the dashboard/summary cards
    status: ShipmentStatus; // Using the exported type

    estimatedDelivery: string; // ISO date string

    // 💡 FIX: Including necessary properties from mock data and general application use
    weight: number;
    carrier: string;

    // The detailed timeline for the TrackDetailComponent
    trackingHistory: TrackingEvent[];
}
