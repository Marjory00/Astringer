// Astringer/backend/server.js (CORRECTED CODE)

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000; 
const frontendUrl = 'http://localhost:4200';

// Middleware
app.use(cors({
    origin: frontendUrl
})); 
app.use(bodyParser.json());

// Dummy Courier Logistics Data
const shipments = [
    { id: 'AST456789', status: 'In Transit 🚚', location: 'New York, NY', estimatedDelivery: '2025-10-25' },
    { id: 'AST123456', status: 'Delivered ✅', location: 'Los Angeles, CA', estimatedDelivery: '2025-10-20' },
    { id: 'AST987654', status: 'Out for Delivery 🚨', location: 'Chicago, IL', estimatedDelivery: '2025-10-22' }
];

// ------------------------------------------------------------------
// API ENDPOINTS
// ------------------------------------------------------------------

// 1. Get all shipments
app.get('/api/shipments', (req, res) => {
    res.status(200).json(shipments);
});

// 2. Get single shipment by ID
app.get('/api/shipments/:id', (req, res) => {
    const id = req.params.id;
    const shipment = shipments.find(s => s.id === id);

    if (shipment) {
        res.status(200).json(shipment);
    } else {
        res.status(404).json({ message: `Shipment with ID ${id} not found.` });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Astringer Backend running and listening on port ${port}`);
});