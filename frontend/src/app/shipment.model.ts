// src/app/shipment.model.ts

export interface Shipment {
    id: string;
    trackingId: string;
    origin: string;
    destination: string;
    status: 'In Transit' | 'Delivered' | 'Out for Delivery' | 'Created';
    estimatedDelivery: string; // ISO date string
}
