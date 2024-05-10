import dayjs from 'dayjs';

/**
 * Generates a random day, in the past or future,
 * within the range of 1 to 30 days.
 * 
 * @param {number} direction - 1 for future, -1 for past
 */
const randomDate = (direction = 1) => {
  const days = (Math.floor(Math.random() * 30) + 1) * direction;
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
      startDate: randomDate(),
    },
    {
      userId: users[0].id,
      name: 'Bug Fixing Party',
      location: 'Fishbowl',
      startDate: randomDate(),
    },
    {
      userId: users[2].id,
      name: 'New Features Project',
      location: 'Greenfield Office',
      startDate: randomDate(),
    },
    {
      userId: users[1].id,
      name: 'Celebration',
      location: 'Main Office',
      startDate: randomDate(-1),
    },
    {
      userId: users[2].id,
      name: 'Team Meeting',
      location: 'Main Office',
      startDate: randomDate(-1),
    },
    {
      userId: users[2].id,
      name: 'Happy Hour',
      location: 'Office Kitchen',
      startDate: randomDate(-1),
    },
    {
      userId: users[2].id,
      name: 'Standup Meeting',
      location: 'Oval Office',
      startDate: randomDate(-1),
    },
  ]);

  await events[0].addAttendee(users[1]);
  await events[1].addAttendees([users[1], users[2]]);
};