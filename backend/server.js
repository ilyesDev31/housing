/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const app = require("./app");
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const dbStr = process.env.DB_STRING.replace(
      "<PASSWORD>",
      process.env.DB_PASSWORD
    );
    await mongoose.connect(dbStr);
    console.log("db connected");
  } catch (error) {
    console.log(error.message);
  }
};

connectDb();

app.listen(
  process.env.PORT,
  console.log(`server listening on port ${process.env.PORT}`)
);
