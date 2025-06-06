const errorMiddleware = (err, req, res, next) => {
  try {
    let error = {
      ...err,
    };
    error.message = err.message || "Internal Server Error";
    console.error(error);

    // Mongoose error handling
    if (err.name === "ValidationError") {
      error.statusCode = 400;
      error.message = Object.values(err.errors)
        .map((val) => val.message)
        .join(", ");
    } else if (err.name === "CastError") {
      error.statusCode = 400;
      error.message = `Resource not found with id of ${err.value}`;
    } else if (err.code === 11000) {
      error.statusCode = 400;
      error.message = `Duplicate field value entered: ${Object.keys(
        err.keyValue
      ).join(", ")}`;
    } else {
      error.statusCode = err.statusCode || 500;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
