import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';


const app = express();
const port = 3000;
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    defineModels(sequelize);
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });


const defineModels = async (s) => {
  const Users = s.define('users',
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

  const Events = s.define('events', 
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

  const Attendees = s.define('attendees', {},  {
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

  await s.sync({ force: true })
  .then(() => {
    console.log('Tables created');
  })
  .catch((error) => {
    console.error('Unable to create tables:', error);
  });
};
