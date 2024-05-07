import express from 'express';
import { sequelize } from '../db/sequelize.js';

export const userRoutes = express.Router();

// GET /users
userRoutes.get('/', async (req, res) => {
  const users = await sequelize.models.users.findAll();

  if (!users) {
    res.send('No users have been created.');
  }

  res.json(users);
});