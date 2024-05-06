import express from 'express';
import { Sequelize } from 'sequelize';
import { defineModels } from './db/models.js';
import { seedTables } from './db/seeds.js';
import { userRoutes } from './routes/users.js';
import { eventRoutes } from './routes/events.js';

const app = express();
const port = 3000;
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/db.sqlite',
});

app.use('/users', userRoutes);
app.use('/events', eventRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
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
