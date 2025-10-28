import { Shipment, TrackingEvent } from '../core/models/shipment.model'; // ✅ FIXED: Correct frontend model path

// Helper: ISO date offset by days/hours
const getIsoDateOffset = (days: number = 0, hours: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(date.getHours() - hours);
  return date.toISOString();
};

export const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: '1',
    trackingId: 'ASTRINGER123',
    status: 'In Transit',
    origin: 'Newark, NJ',
    destination: 'Chicago, IL',
    estimatedDelivery: getIsoDateOffset(2),
    weight: 5.5,
    carrier: 'FastRoute Logistics',
    specialInstructions: '',
    trackingHistory: [
      {
        status: 'Departed Facility',
        location: 'Indianapolis Sorting Center, IN',
        timestamp: getIsoDateOffset(0, 10),
        isComplete: true
      },
      {
        status: 'In Transit',
        location: 'Columbus Regional Hub, OH',
        timestamp: getIsoDateOffset(0, 20),
        isComplete: true
      },
      {
        status: 'Processed',
        location: 'Newark Distribution Center, NJ',
        timestamp: getIsoDateOffset(0, 30),
        isComplete: true
      }
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  },
  {
    id: '2',
    trackingId: 'BCOURIER456',
    status: 'Delivered',
    origin: 'Los Angeles, CA',
    destination: 'Miami, FL',
    estimatedDelivery: getIsoDateOffset(-5),
    weight: 22.1,
    carrier: 'Pioneer Freight',
    specialInstructions: '',
    trackingHistory: [
      {
        status: 'Delivered',
        location: 'Miami Residential Address, FL',
        timestamp: getIsoDateOffset(0, 120),
        isComplete: true
      },
      {
        status: 'Out for Delivery',
        location: 'Miami Local Terminal, FL',
        timestamp: getIsoDateOffset(0, 130),
        isComplete: true
      }
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  },
  {
    id: '3',
    trackingId: 'CSHIP789',
    status: 'Exception',
    origin: 'Dallas, TX',
    destination: 'Boston, MA',
    estimatedDelivery: getIsoDateOffset(5),
    weight: 1.2,
    carrier: 'SpeedyShip Inc.',
    specialInstructions: '',
    trackingHistory: [
      {
        status: 'Exception',
        location: 'Memphis Air Hub, TN',
        timestamp: getIsoDateOffset(0, 5),
        isComplete: false
      },
      {
        status: 'Scanned at Origin',
        location: 'Dallas Freight Station, TX',
        timestamp: getIsoDateOffset(-2),
        isComplete: true
      }
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  },
  {
    id: '4',
    trackingId: 'DFAST101',
    status: 'In Transit',
    origin: 'Seattle, WA',
    destination: 'San Diego, CA',
    estimatedDelivery: getIsoDateOffset(1),
    weight: 10.0,
    carrier: 'WestCoast Movers',
    specialInstructions: '',
    trackingHistory: [
      {
        status: 'Departed Facility',
        location: 'Sacramento Hub, CA',
        timestamp: getIsoDateOffset(0, 5),
        isComplete: true
      },
      {
        status: 'Processed',
        location: 'Seattle Main Depot, WA',
        timestamp: getIsoDateOffset(0, 15),
        isComplete: true
      }
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }
];

// Log statement (kept for console clarity)
console.log('MOCK_SHIPMENTS loaded:', MOCK_SHIPMENTS.length);
