// src/app/shipment.model.ts (CONSOLIDATED & FINALIZED)

// Export Status Type for use across components (e.g., dashboard, cards)
export type ShipmentStatus = 'In Transit' | 'Delivered' | 'Out for Delivery' | 'Created' | 'Exception';

// 1. TrackingEvent Interface (The history detail)
export interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string; // ISO date string
  isComplete: boolean; // For visual timeline completion status
}

// 2. Shipment Interface (The main entity)
export interface Shipment {
    id: string;
    trackingId: string;
    origin: string;
    destination: string;

    // Summary status for display in the dashboard/summary cards
    status: ShipmentStatus; // Using the exported type

    estimatedDelivery: string; // ISO date string

    // The detailed timeline for the TrackDetailComponent
    trackingHistory: TrackingEvent[];
}
