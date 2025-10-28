// backend/src/models/shipment.model.ts 
// (Used by Express/Mongoose/Sequelize for data structure definition)

// 1. Export Status Type
export type ShipmentStatus = 'In Transit' | 'Delivered' | 'Out for Delivery' | 'Created' | 'Exception';

// ---
// 2. TrackingEvent Interface
// This should match the structure used when recording events in the database.
export interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string; // ISO date string
  isComplete: boolean; 
}

// ---
// 3. RouteCapacity Interface
// Useful if your backend needs a typed structure for capacity records.
export interface RouteCapacity {
  date: string; // YYYY-MM-DD
  availableCapacity: number;
  bookedVolume: number;
}

// ---
// 4. Shipment Interface (The main entity)
export interface Shipment {
    // Core IDs
    id: string;
    trackingId: string;

    // Primary Fields (often indexed or required)
    origin: string;
    destination: string;
    weight: number;
    carrier: string;

    // Status & Dates
    status: ShipmentStatus;
    estimatedDelivery: string; // ISO date string
    
    // Optional/Nullable field from the Planning Form
    specialInstructions?: string; 

    // History
    trackingHistory: TrackingEvent[];

    // Additional backend-managed fields (e.g., timestamps)
    // createdAt?: Date; 
    // updatedAt?: Date;
}