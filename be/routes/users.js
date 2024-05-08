import express from 'express';
import { Sequelize } from 'sequelize';
import { Models } from '../db/models.js';

export const userRoutes = express.Router();

const sequelize = new Sequelize('sqlite::memory:');
const userParams = (body) => ({
  firstName: body.firstName,
  lastName: body.lastName,
  emailAddress: body.emailAddress,
});

// GET /users
userRoutes.get('/', async (req, res) => {
  const users = await sequelize.models.user.findAll();

  if (!users) {
    res.send('No users have been created.');
  }

  res.json(users);
});

// GET /users/:id
userRoutes.get('/:id', async (req, res) => {
  const user = await Models.User.findByPk(req.params.id);

  if (!user) {
    res.status(404).send('User not found.');
  }

  res.json(user);
});

// POST /users
userRoutes.post('/', async (req, res) => {
  const user = await sequelize.models.user.create(userParams(req.body));

  res.json(user);
});

// DELETE /users/:id
userRoutes.delete('/:id', async (req, res) => {
  await sequelize.models.user.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(204).send();
});

// PATCH /users/:id
userRoutes.patch('/:id', async (req, res) => {
  const user = await sequelize.models.user.findByPk(req.params.id);

  if (!user) {
    res.status(404).send('User not found.');
  }

  await user.update(userParams(req.body));

  res.json(user);
});

// POST /users/:id/events/:eventId
userRoutes.post('/:id/events/:eventId', async (req, res) => {
  const user = await sequelize.models.user.findByPk(req.params.id);
  const event = await sequelize.models.event.findByPk(req.params.eventId);

  if (!user || !event) {
    res.status(404).send('User or event not found.');
  }

  await user.addEvent(event);

  res.json(user);
});

// DELETE /users/:id/events/:eventId
userRoutes.delete('/:id/events/:eventId', async (req, res) => {
  const user = await sequelize.models.user.findByPk(req.params.id);
  const event = await sequelize.models.event.findByPk(req.params.eventId);

  if (!user || !event) {
    res.status(404).send('User or event not found.');
  }

  await user.removeEvent(event);

  res.json(user);
});