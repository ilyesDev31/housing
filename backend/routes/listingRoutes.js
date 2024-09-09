/* eslint-disable no-undef */
const router = require("express").Router();

const { protect } = require("../middleware/auth");
const {
  getAllListings,
  createListing,
  getTypeListing,
  getOffers,
  uploadListingImage,
  resizeListingImages,
  getSingleListing,
  getUserListings,
  deleteListing,
} = require("../controllers/listingControllers");
router
  .route("/")
  .get(getAllListings)
  .post(protect, uploadListingImage, resizeListingImages, createListing);
router.get("/offers", getOffers);
router.get("/userListings", protect, getUserListings);
router.get("/:type", getTypeListing, getAllListings);
router.get("/single/:id", getSingleListing);
router.delete("/delete/:id", protect, deleteListing);
module.exports = router;
