import { DataTypes } from 'sequelize';

export const Models = {
  User: null,
  Event: null,
  Attendee: null,
}

export const defineModels = async (sequelize) => {
  Models.User = sequelize.define('user',
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

  Models.Event = sequelize.define('event', 
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

  Models.Attendee = sequelize.define('user_events', {},  {
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
  
  Models.User.hasMany(Models.Event);
  Models.Event.belongsTo(Models.User);

  Models.User.belongsToMany(Models.Event, { through: Models.Attendee, as: 'attendingEvents' });
  Models.Event.belongsToMany(Models.User, { through: Models.Attendee, as: 'attendees' });

  try {
    await sequelize.sync({ force: true });
    console.log('Tables created');
  } catch (error) {
    console.error('Unable to create tables:', error);
  }
};