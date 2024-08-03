const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({ 
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
   })
};

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {

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

exports.updateTour = (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Not implemented"
  })
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null
  })
};