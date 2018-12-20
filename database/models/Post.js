const mongoose = require("mongoose");

//PostSchema is structure of collection

const PostSchema = new mongoose.Schema({
  title: String,
  startby: String,
  needitby: String,
  price: String,
  needat: String,
  additionaldetails: String,
  content: String,
  postedBy: String,
  postedByName: String,
  postedByEmail: String,
  category: String,
  created: {
    type: Date,
    default: new Date(),
  },
});
//Post is collection

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
