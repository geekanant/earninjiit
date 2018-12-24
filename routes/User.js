const express = require("express");
const users = express.Router();
const cors = require("cors");
const User = require("../database/models/User");
const Post = require("../database/models/Post");
users.use(cors());

users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    date: today,
    phone: "",
    modeofcontact: "",
  };

  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        User.create(userData)
          .then((user) => {
            res.send(user);
          })
          .catch((err) => {
            res.send("error: " + err);
          });
      } else {
        res.json({ error: "User already exists" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

users.post("/newPost", (req, res) => {
  const postData = {
    title: req.body.title,
    startby: req.body.startby,
    needitby: req.body.needitby,
    price: req.body.price,
    needat: req.body.needat,
    content: req.body.content,
    additionaldetails: req.body.additionaldetails,
    created: new Date(),
    category: req.body.category,
    postedBy: req.body.userId,
    postedByName: req.body.postedByName,
    postedByEmail: req.body.postedByEmail,
  };

  Post.create(postData);

  res.send(true);
});

module.exports = users;
