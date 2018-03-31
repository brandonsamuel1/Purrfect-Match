const express = require("express");
const router = express.Router();
const Felines = require("../models/felines");


router.get("/", function(req, res){
  Felines.find({}, function(err, allFelines){
    if(err){
      console.log(err);
    } else {
      res.render("felines/felines", {felines: allFelines});
    }
  })
});


router.post("/", function(req, res){
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let age = req.body.age;
  let breed = req.body.breed;
  let newFeline = {name: name, image: image, description: desc, age: age, breed: breed}
  Felines.create(newFeline, function(err, newlyCreated){
    if(err) {
      console.log(err);
    } else {
      res.redirect("/felines");
    }
  })
});



router.get("/new", function(req, res){
  res.render("felines/new");
});



router.get("/:id", function(req, res){
  Felines.findById(req.params.id, function(err, foundFeline){
    if(err){
      console.log(err);
    } else {
      res.render("felines/show", {feline: foundFeline})
    }
  })
});

module.exports = router;