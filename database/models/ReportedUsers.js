const mongoose = require("mongoose");

const reportedScheme = new mongoose.Schema({
  email: String,
  postedBy: String,
  reportedPost: String,
  reportedByName: String,
  reportedByEmail: String,
  created: {
    type: Date,
    default: new Date(),
  },
});

const Reported = mongoose.model("Reported", reportedScheme);

module.exports = Reported;
