/* eslint-disable no-console */
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Expected operational errors
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Unexpected programming errors
  } else {
    console.log('ERROR', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  const env = process.env.NODE_ENV;
  if (env === 'development') {
    sendErrorDev(err, res);
  } else if (env === 'production') {
    sendErrorProd(err, res);
  }

  next();
};
