/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
module.exports = (user, statusCode, res) => {
  const token = user.signToken(user.id);
  const cookiesOptions = {
    httpOnly: true,
    ecure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "Strict",
    path: "/",
  };
  user.password = undefined;
  res.cookie("jwt", token, cookiesOptions).status(statusCode).json({
    status: "success",
    user,
  });
};
