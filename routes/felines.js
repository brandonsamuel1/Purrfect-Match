const express = require("express");
const router = express.Router();
const Felines = require("../models/felines");
const middleware = require("../middleware/index");
const sgMail = require('@sendgrid/mail');

require('dotenv').config();


//HOME PAGE
router.get("/", function(req, res){
  Felines.find({}, function(err, allFelines){
    if(err){
      console.log(err);
    } else {
      res.render("felines/felines", {felines: allFelines});
    }
  })
});

//CREATING NEW FELINES
router.post("/", middleware.isLoggedIn, function(req, res){
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let age = req.body.age;
  let breed = req.body.breed;
  let author = {id: req.user._id, username: req.user.username}
  let newFeline = {name: name, image: image, description: desc, age: age, breed: breed, author: author}
  Felines.create(newFeline, function(err, newlyCreated){
    if(err) {
      console.log(err);
    } else {
      res.redirect("/felines");
    }
  });
});


//SHOWING CREATE NEW PAGE
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("felines/new");
});


//DISPLAYING A SINGLE FELINE PAGE
router.get("/:id", function(req, res){
  Felines.findById(req.params.id).populate("comments").exec(function(err, foundFeline){
    if(err){
      console.log(err);
    } else {
      res.render("felines/show", {feline: foundFeline})
    }
  })
});


//EDIT SINGLE FELINE PAGE
router.get("/:id/edit", middleware.ownFeline, function(req, res){
  Felines.findById(req.params.id, function(err, foundFeline){
    if(err){
      console.log(err);
    } else{
      res.render("felines/edit", {feline: foundFeline})
    }
  })
});


//UPDATING A SINGLE FELINE
router.put("/:id", middleware.ownFeline, function(req, res){
  Felines.findByIdAndUpdate(req.params.id, req.body.feline, function(err, updatedFeline){
    if(err){
      res.render("felines/edit");
    } else{
      req.flash("success", "Post Updated!");
      res.redirect("/felines/" + req.params.id);
    }
  })
});


//DELETING A SINGLE FELINE
router.delete("/:id", middleware.ownFeline, function(req, res){
  Felines.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
    } else{
      req.flash("success", "Post Deleted!");
      res.redirect("/felines");
    }
  })
});


//ADOPTING A FELINE
router.get("/:id/adoption", function(req, res){
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'brandonsamuel72@gmail.com',
    from: 'purrfectmatch@gmail.com',
    subject: 'Thank You For Your Adoption!',
    text: 'I hope you enjoy your new adoption!',
    html: '<strong>I hope you enjoy your new adoption, we are very pleased to have you welcome your feline friend into your home.</strong>',
  };
  sgMail.send(msg);
  console.log("Email sent...");
  //res.redirect("/felines/" + req.params.id);
});

module.exports = router;