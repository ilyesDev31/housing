/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const rateLimit = require("express-rate-limit");
const sanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const cors = require("cors");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const authRouter = require("./routes/authRoutes");
const listingRouter = require("./routes/listingRoutes");
// dealing with body, url and cookies and serving static files
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ limit: "32kb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// securing the app
app.use(helmet());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(sanitize());
app.use(hpp());
// rate limit
const limit = rateLimit({
  max: 10,
  windowMs: 10 * 60 * 1000,
  message: "to much requests please try again later",
});
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use("/api/auth", limit);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/listing", listingRouter);
app.use(errorHandler);
module.exports = app;
