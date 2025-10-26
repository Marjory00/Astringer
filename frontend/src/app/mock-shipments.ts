// src/app/mock-shipments.ts (FINALIZED AND TYPE-CORRECTED)

import { Shipment } from './shipment.model'; // Assuming TrackingEvent is also exported/used here

// Helper function to get an ISO string date offset by days or hours
const getIsoDateOffset = (days: number = 0, hours: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(date.getHours() - hours);
  return date.toISOString(); // <--- CRITICAL FIX: Convert to ISO string
};

export const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: '1',
    trackingId: 'ASTRINGER123',
    status: 'In Transit',
    origin: 'Newark, NJ',
    destination: 'Chicago, IL',
    // FIX: Convert to ISO string
    estimatedDelivery: getIsoDateOffset(2),
    weight: 5.5,
    carrier: 'FastRoute Logistics',
    trackingHistory: [
      {
        status: 'Departed Facility',
        location: 'Indianapolis Sorting Center, IN',
        // FIX: Convert to ISO string
        timestamp: getIsoDateOffset(0, 10),
        isComplete: true,
        coords: [39.7684, -86.1580]
      },
      {
        status: 'In Transit',
        location: 'Columbus Regional Hub, OH',
        // FIX: Convert to ISO string
        timestamp: getIsoDateOffset(0, 20),
        isComplete: true,
        coords: [39.9612, -82.9988]
      },
      {
        status: 'Processed',
        location: 'Newark Distribution Center, NJ',
        // FIX: Convert to ISO string
        timestamp: getIsoDateOffset(0, 30),
        isComplete: true,
        coords: [40.7357, -74.1724]
      },
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
  },
  {
    id: '2',
    trackingId: 'BCOURIER456',
    status: 'Delivered',
    origin: 'Los Angeles, CA',
    destination: 'Miami, FL',
    // FIX: Convert to ISO string
    estimatedDelivery: getIsoDateOffset(-5),
    weight: 22.1,
    carrier: 'Pioneer Freight',
    trackingHistory: [
      {
        status: 'Delivered',
        location: 'Miami Residential Address, FL',
        // FIX: Convert to ISO string
        timestamp: getIsoDateOffset(0, 120),
        isComplete: true,
        coords: [25.7617, -80.1918]
      },
      {
        status: 'Out for Delivery',
        location: 'Miami Local Terminal, FL',
        // FIX: Convert to ISO string
        timestamp: getIsoDateOffset(0, 130),
        isComplete: true,
        coords: [25.7617, -80.1918]
      },
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
  },
  {
    id: '3',
    trackingId: 'CSHIP789',
    status: 'Exception',
    origin: 'Dallas, TX',
    destination: 'Boston, MA',
    // FIX: Convert to ISO string
    estimatedDelivery: getIsoDateOffset(5),
    weight: 1.2,
    carrier: 'SpeedyShip Inc.',
    trackingHistory: [
      {
        status: 'Exception',
        location: 'Memphis Air Hub, TN',
        // FIX: Convert to ISO string
        timestamp: getIsoDateOffset(0, 5),
        isComplete: false,
        coords: [35.1495, -90.0490]
      },
      {
        status: 'Scanned at Origin',
        location: 'Dallas Freight Station, TX',
        // FIX: Convert to ISO string
        timestamp: getIsoDateOffset(-2),
        isComplete: true,
        coords: [32.7767, -96.7970]
      },
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
  },
  {
    id: '4',
    trackingId: 'DFAST101',
    status: 'In Transit',
    origin: 'Seattle, WA',
    destination: 'San Diego, CA',
    // FIX: Convert to ISO string
    estimatedDelivery: getIsoDateOffset(1),
    weight: 10.0,
    carrier: 'WestCoast Movers',
    trackingHistory: [
      {
        status: 'Departed Facility',
        location: 'Sacramento Hub, CA',
        // FIX: Convert to ISO string
        timestamp: getIsoDateOffset(0, 5),
        isComplete: true,
        coords: [38.5816, -121.4944]
      },
      {
        status: 'Processed',
        location: 'Seattle Main Depot, WA',
        // FIX: Convert to ISO string
        timestamp: getIsoDateOffset(0, 15),
        isComplete: true,
        coords: [47.6062, -122.3321]
      },
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
  }
];
