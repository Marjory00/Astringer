// Astringer/backend/server.js (Consolidated Search Logic)

const express = require('express');
const cors = require('cors'); 

const app = express();
const port = 3000; 
const frontendUrl = 'http://localhost:4200';

// Middleware
app.use(cors({
    origin: frontendUrl // Allows only the Angular frontend to connect
})); 
app.use(express.json());

// Dummy Courier Logistics Data (Data remains the same)
let shipments = [
    { 
        id: '1', 
        trackingId: 'AST456789', 
        origin: 'New York, NY', 
        destination: 'Seattle, WA',
        status: 'In Transit', 
        estimatedDelivery: '2025-11-05T00:00:00.000Z', 
        weight: 15.5,
        carrier: 'Astringer Fleet'
    },
    { 
        id: '2',
        trackingId: 'AST123456', 
        origin: 'Miami, FL', 
        destination: 'Los Angeles, CA',
        status: 'Delivered', 
        estimatedDelivery: '2025-10-20T00:00:00.000Z',
        weight: 8.2,
        carrier: 'Pioneer Freight'
    },
    { 
        id: '3',
        trackingId: 'AST987654', 
        origin: 'Dallas, TX', 
        destination: 'Chicago, IL',
        status: 'Out for Delivery', 
        estimatedDelivery: '2025-10-22T00:00:00.000Z',
        weight: 22.0,
        carrier: 'Astringer Fleet'
    }
];

// ------------------------------------------------------------------
// API ENDPOINTS
// ------------------------------------------------------------------

// 1. GET all shipments / search shipments (Consolidated Endpoint)
app.get('/api/shipments', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    let resultShipments = shipments;
    let latency = 500; // Default latency for fetching all

    if (query) {
        // 💥 FIX/CONSOLIDATION: Apply filtering if the 'q' query parameter is present
        resultShipments = shipments.filter(s =>
            s.trackingId.toLowerCase().includes(query) ||
            s.destination.toLowerCase().includes(query)
        );
        latency = 300; // Shorter latency for search
    }
    
    setTimeout(() => {
        res.status(200).json(resultShipments);
    }, latency); 
});

// 2. GET single shipment by ID or Tracking ID
app.get('/api/shipments/:id', (req, res) => {
    const id = req.params.id;
    const shipment = shipments.find(s => s.id === id || s.trackingId === id); 

    if (shipment) {
        res.status(200).json(shipment);
    } else {
        res.status(404).json({ message: `Shipment with ID or Tracking ID ${id} not found.` });
    }
});

// 3. POST /api/shipments - Handles new shipment creation (from PlanningComponent)
app.post('/api/shipments', (req, res) => {
    setTimeout(() => {
        const data = req.body;
        
        const newId = (shipments.length + 1).toString();
        const newTrackingId = 'AST' + Math.floor(100000 + Math.random() * 900000);

        const newShipment = {
            id: newId,
            trackingId: newTrackingId,
            origin: data.origin,
            destination: data.destination,
            weight: data.weight,
            carrier: data.carrier,
            estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'Created',
        };

        shipments.push(newShipment);
        
        res.status(201).json(newShipment);
    }, 2000);
});

// FIX: Removed the separate /search endpoint as it is now handled by the root GET /api/shipments

// Start the server
app.listen(port, () => {
    console.log(`Astringer Backend running and listening on port ${port}`);
});