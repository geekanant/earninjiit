const express = require("express");
const users = express.Router();
const cors = require("cors");
const User = require("../database/models/User");
const Bug = require("../database/models/Bug");

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

users.get("/categories", (req, res) => {
  const categories = [
    {
      id: "1",
      name: "App Development",
      title: "Need of an App Developer",
    },
    {
      id: "2",
      name: "Assignment Solving",
      title: "Need someone to solve my assignment",
    },
    {
      id: "3",
      name: "Books",
      title: "Need some books",
    },
    {
      id: "4",
      name: "Content Writing",
      title: "Need a good content writer",
    },
    {
      id: "5",
      name: "Data Entry",
      title: "Need a data entry person",
    },
    {
      id: "6",
      name: "Exam Help",
      title: "Need Help for exams",
    },
    {
      id: "7",
      name: "Notes",
      title: "Need Notes",
    },
    {
      id: "8",
      name: "Photoshop/Photo Editing",
      title: "Need someone for photoshop work",
    },

    {
      id: "9",
      name: "Photoshoot",
      title: "Need a photographer",
    },
    {
      id: "10",
      name: "Photocopy/Print Out",
      title: "Need Print out of my lab assignments",
    },
    {
      id: "11",
      name: "Practical File",
      title: "Need a Practical File",
    },
    {
      id: "12",
      name: "Promotions/Marketing",
      title: "Need someone to promote my startup",
    },
    {
      id: "13",
      name: "Project",
      title: "Need Help in my project",
    },
    {
      id: "14",
      name: "Video Editing",
      title: "Need someone for Video Editing",
    },
    {
      id: "15",
      name: "Web Development",
      title: "Need of a Website Developer",
    },
    {
      id: "16",
      name: "Other",
    },
  ];
  res.send({
    category: categories,
  });
});

users.get("/posts", (req, res) => {
  Post.find(
    {
      created: { $gt: new Date(Date.now() - 24 * 60 * 60 * 7 * 1000) },
      postedBy: { $ne: req.query.postedBy },
    },
    function (error, posts) {
      if (error) {
        console.error(error);
      }
      res.send({
        posts: posts,
      });
    }
  ).sort({ created: -1 });
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

users.post("/newBug", (req, res) => {
  const bugData = {
    needat: req.body.needat,
    content: req.body.content,
    created: new Date(),
    postedBy: req.body.userId,
    postedByName: req.body.postedByName,
    postedByEmail: req.body.postedByEmail,
  };
  Bug.create(bugData);
  res.send(true);
});

module.exports = users;
