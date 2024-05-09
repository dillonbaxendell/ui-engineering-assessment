import express from 'express';
import { Sequelize } from 'sequelize';
import { Models } from '../db/models.js';

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
  const events = await Models.Event.findAll({
    attributes: {
      include: [
        [Sequelize.fn('COUNT', Sequelize.col('attendees.id')), 'attendeesCount'],
      ],
    },
    include: [
      {
        model: Models.User,
        as: 'attendees',
        attributes: [],
      },
    ],
    group: ['event.id'],
  });

  if (!events) {
    res.send('No events have been created.');
  }

  res.status(200).json(events);
});

// GET /events/:id
eventRoutes.get('/:id', async (req, res) => {
  const event = await Models.Event.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Models.User,
        as: 'attendees',
      },
    ]
  });

  if (!event) {
    res.status(404).send('Event not found.');
  }

  res.status(200).json(event);
});

// POST /events
eventRoutes.post('/', async (req, res) => {
  const event = await Models.Event.create(eventParams(req.body));

  res.json(event);
});

// DELETE /events/:id
eventRoutes.delete('/:id', async (req, res) => {
  await Models.Event.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(204).send();
});

// PATCH /events/:id
eventRoutes.patch('/:id', async (req, res) => {
  const event = await Models.Event.findByPk(req.params.id);

  if (!event) {
    res.status(404).send('Event not found.');
  }

  await event.update(eventParams(req.body));

  res.json(event);
});