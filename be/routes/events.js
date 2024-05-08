import express from 'express';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

export const eventRoutes = express.Router();

const eventParams = (body) => ({
  name: body.name,
  location: body.location,
  startDate: body.startDate,
  description: body.description,
  userId: body.userId,
  attendees: body.attendees,
});

// GET /events
eventRoutes.get('/', async (req, res) => {
  const events = await sequelize.models.event.findAll();
  console.log('attendees', sequelize.models.event.countAttendees());

  if (!events) {
    res.send('No events have been created.');
  }

  res.json(events);
});

// GET /events/:id
eventRoutes.get('/:id', async (req, res) => {
  const event = await sequelize.models.event.findByPk(req.params.id);

  if (!event) {
    res.status(404).send('Event not found.');
  }

  res.json(event);
});

// POST /events
eventRoutes.post('/', async (req, res) => {
  const event = await sequelize.models.event.create(eventParams(req.body));

  res.json(event);
});

// DELETE /events/:id
eventRoutes.delete('/:id', async (req, res) => {
  await sequelize.models.event.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(204).send();
});

// PATCH /events/:id
eventRoutes.patch('/:id', async (req, res) => {
  const event = await sequelize.models.event.findByPk(req.params.id);

  if (!event) {
    res.status(404).send('Event not found.');
  }

  await event.update(eventParams(req.body));

  res.json(event);
});