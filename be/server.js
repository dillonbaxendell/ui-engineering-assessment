import express from 'express';
import { defineModels, Models } from './db/models.js';
import { seedTables } from './db/seeds.js';
import { userRoutes } from './routes/users.js';
import { eventRoutes } from './routes/events.js';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/db.sqlite',
});

const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/v1/users', userRoutes);
app.use('/v1/events', eventRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/v1/login', async (req, res) => {
  console.log('body', req.body);
  const user = await Models.User.findOne({
    where: {
      emailAddress: req.body.emailAddress,
    },
  });

  if (!user) {
    res.status(400).send('User not found.');
  }

  res.json(user);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
  await defineModels(sequelize);
  console.log('Tables created');
  await seedTables(sequelize);
  console.log('Tables seeded');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
