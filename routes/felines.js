const express = require("express");
const router = express.Router();
const Felines = require("../models/felines");


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

//CREATING NEW FELINES PAGE
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


//SHOWING CREATE NEW PAGE
router.get("/new", function(req, res){
  res.render("felines/new");
});


//DISPLAYING A SINGLE FELINE PAGE
router.get("/:id", function(req, res){
  Felines.findById(req.params.id, function(err, foundFeline){
    if(err){
      console.log(err);
    } else {
      res.render("felines/show", {feline: foundFeline})
    }
  })
});


//EDIT SINGLE FELINE PAGE
router.get("/:id/edit", function(req, res){
  Felines.findById(req.params.id, function(err, foundFeline){
    if(err){
      console.log(err);
    } else{
      res.render("felines/edit", {feline: foundFeline})
    }
  })
});


//UPDATING A SINGLE FELINE
router.put("/:id", function(req, res){
  Felines.findByIdAndUpdate(req.params.id, req.body.feline, function(err, updatedFeline){
    if(err){
      res.render("felines/edit");
    } else{
      res.redirect("/felines/" + req.params.id);
    }
  })
});


//DELETING A SINGLE FELINE
router.delete("/:id", function(req, res){
  Felines.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
    } else{
      res.redirect("/felines");
    }
  })
});

module.exports = router;