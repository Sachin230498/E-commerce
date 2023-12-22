const mongoose = require("mongoose");
const mongodbUrl = "mongodb://localhost:27017/e-commerce-2";

const connectDb = () => {
  return mongoose.connect(mongodbUrl);
};

module.exports = { connectDb };
