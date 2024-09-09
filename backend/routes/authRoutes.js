/* eslint-disable no-undef */
const router = require("express").Router();

const { protect } = require("../middleware/auth");
const {
  register,
  login,
  logout,
  updateProfile,
  getProfile,
  forgotPassword,
  resetPassword,
  checkPasswordResetToken,
  listingOwner,
} = require("../controllers/authControllers");
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.route("/me").get(protect, getProfile).put(protect, updateProfile);
router.get("/listingOwner/:id", listingOwner);
router.post("/forgotPassword", forgotPassword);
router.get("/resetPassword/:token", checkPasswordResetToken);
router.post("/resetPassword/:token", resetPassword);
module.exports = router;
