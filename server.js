/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('App crashed - uncaught exception!');
  console.log(err.name, ' - ', err.message);
  process.exit(1);
});

dotenv.config({ path: './.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  'PASSWORD',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.log('Could not connect to the database');
    console.log(err.message);
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server up and running at port ${port}`);
});

process.on('unhadledRejection', (err) => {
  console.log(err.name, ' - ', err.message);
  console.log('App crashed - unhandled rejection!');
  server.close(() => {
    process.exit(1);
  });
});
