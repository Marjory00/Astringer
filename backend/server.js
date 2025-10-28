// Astringer/backend/server.js (Full Implementation)

const express = require('express');
const cors = require('cors'); 

const app = express();
const port = 3000; 
const frontendUrl = 'http://localhost:4200';

// Middleware
app.use(cors({
    origin: frontendUrl // Allows only the Angular frontend to connect
})); 
app.use(express.json()); // Essential for parsing POST body data

// --- Dummy Courier Logistics Data ---
let shipments = [
    { 
        id: '1', 
        trackingId: 'AST456789', 
        origin: 'New York, NY', 
        destination: 'Seattle, WA',
        status: 'In Transit', 
        estimatedDelivery: '2025-11-05T00:00:00.000Z', 
        weight: 15.5,
        carrier: 'Astringer Fleet',
        specialInstructions: '',
        trackingHistory: [{ status: 'Left Origin', location: 'New York, NY', timestamp: '2025-10-25T10:00:00Z', isComplete: false }]
    },
    { 
        id: '2',
        trackingId: 'AST123456', 
        origin: 'Miami, FL', 
        destination: 'Los Angeles, CA',
        status: 'Delivered', 
        estimatedDelivery: '2025-10-20T00:00:00.000Z',
        weight: 8.2,
        carrier: 'Pioneer Freight',
        specialInstructions: 'Handle with care.',
        trackingHistory: [{ status: 'Delivered', location: 'Los Angeles, CA', timestamp: '2025-10-20T14:30:00Z', isComplete: true }]
    },
    { 
        id: '3',
        trackingId: 'AST987654', 
        origin: 'Dallas, TX', 
        destination: 'Chicago, IL',
        status: 'Out for Delivery', 
        estimatedDelivery: '2025-10-28T00:00:00.000Z',
        weight: 22.0,
        carrier: 'Astringer Fleet',
        specialInstructions: '',
        trackingHistory: [{ status: 'Out for Delivery', location: 'Chicago, IL', timestamp: '2025-10-28T08:00:00Z', isComplete: false }]
    }
];

let trackingIdCounter = 100000; // Counter for creating unique tracking IDs

// ------------------------------------------------------------------
// API ENDPOINTS
// ------------------------------------------------------------------

// 1. GET all shipments / search shipments (Consolidated Endpoint)
app.get('/api/shipments', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    let resultShipments = shipments;
    let latency = 500; 

    if (query) {
        // Apply filtering if the 'q' query parameter is present
        resultShipments = shipments.filter(s =>
            s.trackingId.toLowerCase().includes(query) ||
            s.destination.toLowerCase().includes(query) ||
            s.origin.toLowerCase().includes(query) ||
            s.status.toLowerCase().includes(query) // Added status and origin to search
        );
        latency = 300; 
    }
    
    setTimeout(() => {
        res.status(200).json(resultShipments);
    }, latency); 
});

// 2. GET single shipment by ID or Tracking ID
app.get('/api/shipments/:id', (req, res) => {
    const id = req.params.id;
    const shipment = shipments.find(s => s.id === id || s.trackingId === id); 

    // 💥 FIX: Added a small mock latency for single tracking lookup
    const latency = 150; 
    
    setTimeout(() => {
        if (shipment) {
            res.status(200).json(shipment);
        } else {
            res.status(404).json({ message: `Shipment with ID or Tracking ID ${id} not found.` });
        }
    }, latency);
});

// 3. POST /api/shipments - Handles new shipment creation (from PlanningComponent)
app.post('/api/shipments', (req, res) => {
    // Using a slightly longer latency to simulate a database write
    const writeLatency = 1000; 
    
    setTimeout(() => {
        const data = req.body;
        
        // Basic Validation
        if (!data.origin || !data.destination || !data.weight || !data.carrier) {
            return res.status(400).json({ message: 'Missing required fields: origin, destination, weight, or carrier.' });
        }

        // Generate IDs
        const newId = Date.now().toString(); // Use timestamp for unique ID
        const newTrackingId = `AST${trackingIdCounter++}`; 

        const newShipment = {
            id: newId,
            trackingId: newTrackingId,
            origin: data.origin,
            destination: data.destination,
            weight: data.weight,
            carrier: data.carrier,
            // 💥 FIX: Include nested dimensions object
            dimensions: data.dimensions,
            // 💥 FIX: Include special instructions
            specialInstructions: data.specialInstructions || '', 
            
            // Default status and mock estimated delivery
            status: 'Created',
            estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Mock 7 days out
            
            // 💥 FIX: Add initial tracking history to match model requirements
            trackingHistory: [{
                status: 'Shipment created',
                location: data.origin,
                timestamp: new Date().toISOString(),
                isComplete: false,
            }]
        };

        shipments.push(newShipment);
        
        res.status(201).json(newShipment);
    }, writeLatency);
});


// Start the server
app.listen(port, () => {
    console.log(`Astringer Backend running and listening on port ${port}`);
});