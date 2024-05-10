import dayjs from 'dayjs';

/**
 * Generates a random day in the future
 * within the range of 1 to 30 days.
 */
const randomFutureDate = () => {
  const days = Math.floor(Math.random() * 30) + 1;
  return dayjs().add(days, 'day').toDate();
};

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
      description: 'Come and meet the team!',
      startDate: randomFutureDate(),
    },
    {
      userId: users[0].id,
      name: 'Bug Fixing Party',
      location: 'Fishbowl',
      startDate: randomFutureDate(),
    },
    {
      userId: users[0].id,
      name: 'New Features Project',
      location: 'Greenfield Office',
      startDate: randomFutureDate(),
    },
    {
      userId: users[0].id,
      name: 'Celebration',
      location: 'Main Office',
      startDate: randomFutureDate(),
    },
  ]);

  await events[0].addAttendee(users[1]);
  await events[1].addAttendees([users[1], users[2]]);
};