// src/app/mock-shipments.ts (FINAL FIX: Interfaces Defined Locally)

// Locally define the interfaces to break any circular dependency
export interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  isComplete: boolean;
}

export interface Shipment {
    id: string;
    trackingId: string;
    origin: string;
    destination: string;
    status: 'In Transit' | 'Delivered' | 'Out for Delivery' | 'Created' | 'Exception';
    estimatedDelivery: string;
    trackingHistory: TrackingEvent[];
}


// --- Helper function and data definitions remain the same ---

const now = new Date();
const addDays = (date: Date, days: number): string => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate.toISOString();
};

const ship1History: TrackingEvent[] = [
  // ... (history data)
];
// ... (other history arrays)


// --- Final Mock Shipments Export ---
export const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: 's001',
    trackingId: 'AST-784519001',
    origin: 'Chicago, IL',
    destination: 'Atlanta, GA',
    status: 'Delivered',
    estimatedDelivery: addDays(now, 1).split('T')[0],
    trackingHistory: ship1History,
  },
  // ... (rest of the shipment data)
];
