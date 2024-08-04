/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

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

app.listen(port, () => {
  console.log(`Server up and running at port ${port}`);
});
