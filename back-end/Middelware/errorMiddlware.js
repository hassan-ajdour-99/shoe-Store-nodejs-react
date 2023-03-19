const PageNotFound404 = (req, res, next) => {
  res.status(404);
  next(404);
};

// ERROR MIDLWARE
const errorHandler = (err, req, res, next) => {
  // if server is 200 => let's make it 500 which is An Error : 500 MEANS AS SERVER ERROR
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { PageNotFound404, errorHandler };
