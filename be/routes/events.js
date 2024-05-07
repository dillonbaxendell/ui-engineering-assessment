import express from 'express';
import { sequelize } from '../db/sequelize.js';

export const eventRoutes = express.Router();

// GET /events
eventRoutes.get('/', async (req, res) => {
  const events = sequelize.models.Events.findAll();

  if (!events) {
    res.send('No events have been created.');
  }

  res.json(events);
});