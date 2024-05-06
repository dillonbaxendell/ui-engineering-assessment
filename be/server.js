import express from 'express';
import Sequelize from 'sequelize';

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