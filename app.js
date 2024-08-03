const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const port = 3000;

const app = express();

app.use(morgan('dev'));
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({ 
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
   })
};

const getTour = (req, res) => {
  const tourId = req.params.id * 1;

  const tour = tours.find((tour) => tour.id === tourId)
  if (tour === undefined) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid tour ID"
    })
  }

  res.status(200).json({ 
    status: 'success',
    data: {
      tour: tour
    }
  })
};

const createTour = (req, res) => {

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({
        status: 'error',
        message: 'Could not save new tour to a file'
      })
    }
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  })
};

const updateTour = (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Not implemented"
  })
};

const deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null
  })
};

const getUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  })
};

app.route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app.route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

app.route('/api/v1/users')
  .get(getUsers)
  .post(createUser);

app.route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

app.listen(port, () => {
  console.log(`Server up and running at port ${port}`)
});