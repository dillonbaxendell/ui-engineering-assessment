import { DataTypes } from 'sequelize';

export const defineModels = async (sequelize) => {
  const Users = sequelize.define('user',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      indexes: [
        {
          fields: ['emailAddress'],
          unique: true,
        },
      ],
    },
  );

  const Events = sequelize.define('event', 
    {
      name: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      indexes: [{ fields: ['userId'] }],
    }
  );

  const Attendees = sequelize.define('attendee', {},  {
    indexes: [
      {
        fields: ['userId', 'eventId'],
      },
      {
        fields: ['eventId'],
      },
      {
        fields: ['userId'],
      },
    ],
  });
  
  Users.hasMany(Events);
  Events.belongsTo(Users);

  Users.belongsToMany(Events, { through: 'attendees' });
  Events.belongsToMany(Users, { through: 'attendees' });

  try {
    await sequelize.sync({ force: true });
    console.log('Tables created');
  } catch (error) {
    console.error('Unable to create tables:', error);
  }
};