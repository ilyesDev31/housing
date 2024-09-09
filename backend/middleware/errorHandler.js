/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const ErrorResponse = require("../utils/ErrorResponse");
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  if (error.code === 11000) {
    let message;
    if (req.path.includes("/register") || req.path.includes("/me"))
      message = "this email address cannot be used";
    error = new ErrorResponse(message, 400);
  }
  res.status(error.statusCode || 500).json({
    success: "false",
    message: error.message || "something went wrong",
    error,
  });
};

module.exports = errorHandler;
