const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000; 

// Middleware
app.use(cors()); 
app.use(bodyParser.json());

// Dummy Courier Logistics Data
const shipments = [
    { id: 'AST456789', status: 'In Transit 🚚', location: 'New York, NY', estimatedDelivery: '2025-10-25' },
    { id: 'AST123456', status: 'Delivered ✅', location: 'Los Angeles, CA', estimatedDelivery: '2025-10-20' },
    { id: 'AST987654', status: 'Out for Delivery 📦', location: 'Chicago, IL', estimatedDelivery: '2025-10-22' }
];

// API Endpoint: Get all shipments
app.get('/api/shipments', (req, res) => {
    res.status(200).json(shipments);
});

// Start the server
app.listen(port, () => {
    console.log(`Astringer Backend running at http://localhost:${port}`);
});