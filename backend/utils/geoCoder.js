const nodegeocoder = require("node-geocoder");

const options = {
  provider: "mapquest",
  apiKey: "aAqg5zqCLNORSb6ouhFJK79cegcH9bhR",
  formatter: null,
};

const geocoder = nodegeocoder(options);

module.exports = geocoder;
