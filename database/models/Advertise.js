const mongoose = require("mongoose");

const advertiseScheme = new mongoose.Schema({
  title: String,
  email: String,
  postedBy: String,
  postedByName: String,
  postedByEmail: String,
  created: {
    type: Date,
    default: new Date(),
  },
});

const Advertise = mongoose.model("Advertise", advertiseScheme);

module.exports = Advertise;
