// backend/src/controllers/shipment.controller.ts

import { Request, Response, Router } from 'express';
import { shipmentService } from '../services/shipment.service';

const router = Router();

// GET /api/shipments
router.get('/', (req: Request, res: Response) => {
  const shipments = shipmentService.getAllShipments();
  res.status(200).json(shipments);
});

// GET /api/shipments/:id
router.get('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const shipment = shipmentService.getShipmentById(id);

  if (shipment) {
    res.status(200).json(shipment);
  } else {
    res.status(404).json({ message: `Shipment with ID ${id} not found.` });
  }
});

// POST /api/shipments (used by the PlanningComponent)
router.post('/', (req: Request, res: Response) => {
  // In a real app, this would include validation
  const newShipment = shipmentService.createShipment(req.body);
  res.status(201).json(newShipment);
});

export default router;