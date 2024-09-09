/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const ApiFeatures = require("../utils/ApiFeatures");
const ErrorResponse = require("../utils/ErrorResponse");
const catchAsync = require("../middleware/catchAsync");
const Listing = require("../models/Listings");
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("please add a valide image", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadListingImage = upload.array("imageUrls");

exports.resizeListingImages = async (req, res, next) => {
  // console.log(req.files.imageUrls);
  if (!req.files)
    return next(new ErrorResponse("please upload atleast 1 photo", 404));
  let images = [];
  for (let i = 0; i < req.files.length; i++) {
    images.push(
      `${req.user.id}-${Date.now()}-listing-1-${
        req.files[i].originalname.split(".")[0]
      }.jpeg`
    );
    await sharp(req.files[i].buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .toFile(`public/${images[i]}`);
  }

  req.body.imageUrls = images;
  next();
};

exports.getAllListings = catchAsync(async (req, res, next) => {
  let listings = new ApiFeatures(Listing.find(), req.query)
    .filter()
    .sort()
    .select()
    .paginate();
  listings = await listings.model;

  res.status(200).json({
    status: "success",
    length: listings.length,
    listings,
  });
});
// get listings depending on type
exports.getTypeListing = (req, res, next) => {
  if (req.params.type) {
    req.query.type = req.params.type;
  }
  next();
};
exports.getOffers = catchAsync(async (req, res, next) => {
  let offers = new ApiFeatures(Listing.find({ discountedPrice: { $gte: 0 } }));
  offers = await offers.model;
  res.status(200).json({
    status: "success",
    length: offers.length,
    offers,
  });
});
exports.createListing = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  const listing = await Listing.create(req.body);
  res.status(200).json({
    status: "success",
    listing,
  });
});

// get single listing
exports.getSingleListing = catchAsync(async (req, res, next) => {
  let data = await Listing.findById(req.params.id);
  if (!data) {
    data = await Listing.findOne({ user: req.params.id });
    if (!data)
      return next(
        new ErrorResponse("there is no listing with those infos", 404)
      );
  }

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getUserListings = catchAsync(async (req, res, next) => {
  const listings = await Listing.find({ user: req.user.id });
  console.log(req.user.id);
  if (!listings) return next(new ErrorResponse("there is no listings", 404));
  res.status(200).json({
    status: "success",
    length: listings.length,
    data: listings,
  });
});
// delete listing
exports.deleteListing = catchAsync(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (req.user.id.toString() !== listing.user.toString())
    return next(new ErrorResponse("you cant delete this listing", 401));
  await Listing.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "listing deleted successfully",
  });
});
