/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/geoCoder");
const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add a listing name"],
      unique: [true, "listing with this exact name already exists"],
      trim: true,
    },
    type: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    bedrooms: {
      type: Number,
      required: [true, "please add a bedrooms number"],
    },
    bathrooms: {
      type: Number,
      required: [true, "please add a bathrooms number"],
    },
    parking: {
      type: Boolean,
      default: false,
    },
    furnished: {
      type: Boolean,
      default: false,
    },
    offer: {
      type: Boolean,
    },
    regularPrice: Number,
    discountedPrice: Number,
    address: String,
    geoLocation: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
    },
    imageUrls: [String],
    slug: String,
  },
  {
    timestamps: true,
  }
);

listingSchema.index({ geoLocation: "2dsphere" });
// adding slug
listingSchema.pre("save", async function (next) {
  this.slug = slugify(this.name, { toLower: true });
  if (this.address) {
    const details = await geocoder.geocode(this.address);
    this.geoLocation.coordinates = [details[0].latitude, details[0].longitude];
  }

  next();
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
