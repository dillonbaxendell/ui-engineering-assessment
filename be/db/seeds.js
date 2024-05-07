export const seedTables = async (sequelize) => {
  const users = await sequelize.models.user.bulkCreate([
    {
      firstName: 'Event',
      lastName: 'Creator',
      emailAddress: 'test@threeflow.com',
      admin: true,
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      emailAddress: 'jane@threeflow.com',
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'john@threeflow.com',
    },
  ]);

  const events = await sequelize.models.event.bulkCreate([
    {
      userId: users[0].id,
      name: 'Meetup at Threeflow',
      location: 'Main Office',
      startDate: new Date(),
    },
    {
      userId: users[0].id,
      name: 'Bug Fixing Party',
      location: 'Fishbowl',
      startDate: new Date(),
    },
    {
      userId: users[0].id,
      name: 'New Features Project',
      location: 'Greenfield Office',
      startDate: new Date(),
    },
    {
      userId: users[0].id,
      name: 'Celebration',
      location: 'Main Office',
      startDate: new Date(),
    },
  ]);

  await sequelize.models.attendee.bulkCreate([
    {
      userId: users[1].id,
      eventId: events[0].id,
    },
    {
      userId: users[1].id,
      eventId: events[1].id,
    },
    {
      userId: users[2].id,
      eventId: events[1].id,
    },
  ]);
};