/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const ErrorResponse = require("../utils/ErrorResponse");
const catchAsync = require("../middleware/catchAsync");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) return next(new ErrorResponse("no token foundhhh", 401));
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user || user.checkPasswordTimeStamp(decoded.iat))
    return next(new ErrorResponse("please login again", 401));
  req.user = user;
  next();
});
