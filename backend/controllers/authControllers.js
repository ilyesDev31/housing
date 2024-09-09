/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");
const catchAsync = require("../middleware/catchAsync");
const createSendToken = require("../middleware/createSendToken");
const Email = require("../utils/Email");
const crypto = require("crypto");
// register User
exports.register = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  createSendToken(user, 200, res);
});
// login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password)))
    return next(new ErrorResponse("email or password not correct", 401));
  createSendToken(user, 200, res);
});

// logout
exports.logout = (req, res, next) => {
  res
    .cookie("jwt", "", {
      httpOnly: true,
      maxAge: 0,
    })
    .status(200)
    .json({
      status: "successfully logged out",
    });
};
// getProfile
exports.getProfile = (req, res, next) => {
  res.status(200).json({
    status: "success",
    user: req.user,
  });
};
// update profile
exports.updateProfile = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser) return next(new ErrorResponse("please try again", 400));
  res.status(200).json({
    status: "success",
    user: updatedUser,
  });
});
// forgot Password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new ErrorResponse("no user with this email found", 404));
  const token = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const url = `${req.protocol}://${req.get("host")}${req.originalUrl.replace(
    "forgot",
    "reset"
  )}/${token}`;
  const mail = new Email(url, user).resetPassword();
  console.log(mail);
  if (!mail) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse("please try again", 400));
  }
  res.status(200).json({
    status: "email successfully sent",
  });
});
// check if resetPassword token is not expired
exports.checkPasswordResetToken = catchAsync(async (req, res, next) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gte: Date.now() },
  });
  if (!user)
    return next(new ErrorResponse("the link is expired please try again", 400));
  res.status(200).json({
    status: "token not yet expired",
    data: "true",
  });
});
// reset Password
exports.resetPassword = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gte: Date.now() },
  });
  if (!user) return next(new ErrorResponse("please try again ", 404));
  user.password = password;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;
  await user.save();
  console.log(user);
  createSendToken(user, 200, res);
});
// get user with id
exports.listingOwner = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new ErrorResponse("no user found", 404));
  res.status(200).json({
    status: "success",
    user,
  });
});
