const express = require('express');
const cors = require('cors');
require('dotenv').config()
const eventsRoutes = require('./routers/events.route.js');
const { Sequelize } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const sequelize = new Sequelize('database_development', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

app.use('/events', eventsRoutes);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();

module.exports = app;
