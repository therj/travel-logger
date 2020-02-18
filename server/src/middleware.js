// Not found
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.method} ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Error handling
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    success: false,
    request: { headers: req.headers, body: req.body },
    message: error.message,
    error: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
  next();
};

const modifyResponseBody = (req, res, next) => {
  // Modify response here
  next();
};

module.exports = {
  notFound,
  errorHandler,
  modifyResponseBody,
};
