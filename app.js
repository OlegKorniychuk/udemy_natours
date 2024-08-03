const fs = require('fs');
const express = require('express');

const port = 3000;

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({ 
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
   })
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Not implemented"
  })
}) 

app.delete('/api/v1/tours/:id', (req, res) => {
  res.status(204).json({
    status: "success",
    data: null
  })
}) 

app.listen(port, () => {
  console.log(`Server up and running at port ${port}`)
});