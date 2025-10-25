// Astringer/backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Required for cross-origin communication

const app = express();
const port = 3000; 
const frontendUrl = 'http://localhost:4200'; // Angular's default dev server URL

// Middleware
app.use(cors({
    origin: frontendUrl // Allows only the Angular frontend to connect
})); 
app.use(bodyParser.json());

// Dummy Courier Logistics Data
const shipments = [
    { 
        id: '1', 
        trackingId: 'AST456789', 
        origin: 'New York, NY', 
        destination: 'Seattle, WA',
        status: 'In Transit', 
        estimatedDelivery: '2025-10-25T00:00:00.000Z' // Using ISO date string for safety
    },
    { 
        id: '2',
        trackingId: 'AST123456', 
        origin: 'Miami, FL', 
        destination: 'Los Angeles, CA',
        status: 'Delivered', 
        estimatedDelivery: '2025-10-20T00:00:00.000Z' 
    },
    { 
        id: '3',
        trackingId: 'AST987654', 
        origin: 'Dallas, TX', 
        destination: 'Chicago, IL',
        status: 'Out for Delivery', 
        estimatedDelivery: '2025-10-22T00:00:00.000Z' 
    }
];

// ------------------------------------------------------------------
// API ENDPOINTS
// ------------------------------------------------------------------

// 1. Get all shipments - Matches the frontend's getAllShipments() call
app.get('/api/shipments', (req, res) => {
    // FIX: Simulate a 500ms delay to better test the frontend's loading spinner
    setTimeout(() => {
        res.status(200).json(shipments);
    }, 500); 
});

// 2. Get single shipment by ID (used for /track/:id route)
app.get('/api/shipments/:id', (req, res) => {
    const id = req.params.id;
    // Search by the numerical 'id' property, or fallback to 'trackingId'
    const shipment = shipments.find(s => s.id === id || s.trackingId === id); 

    if (shipment) {
        res.status(200).json(shipment);
    } else {
        res.status(404).json({ message: `Shipment with ID or Tracking ID ${id} not found.` });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Astringer Backend running and listening on port ${port}`);
});