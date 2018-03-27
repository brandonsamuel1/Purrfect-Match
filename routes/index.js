const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");


router.get("/", function(req, res){
  res.render("landing");
});


router.get("/register", function(req, res){
  res.render("register");
});


router.post("/register", function(req, res){
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/felines");
    })
  })
});


router.get("/login", function(req, res){
  res.render("login");
});


router.post("/login", passport.authenticate("local",
  {successRedirect: "/felines", failureRedirect: "/login"}),
  function(req, res){
});


router.get("/logout", function(req, res){
  req.logout();
  //req.flash("success", "Successfully Logged Out");
  res.redirect("/login");
});

module.exports = router;