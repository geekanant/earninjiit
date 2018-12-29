const mongoose = require("mongoose");

//PostSchema is structure of collection

const BugSchema = new mongoose.Schema({
  needat: String,
  content: String,
  postedBy: String,
  postedByName: String,
  postedByEmail: String,
  created: {
    type: Date,
    default: new Date(),
  },
});

const Bug = mongoose.model("Bug", BugSchema);

module.exports = Bug;
