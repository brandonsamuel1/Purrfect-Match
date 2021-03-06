const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const middleware = require("../middleware/index");


router.get("/", function(req, res){
  res.render("landing");
});


// REGISTER ROUTE
router.get("/register", function(req, res){
  res.render("register");
});


router.post("/register", function(req, res){
  let newUser = new User({username: req.body.username, email: req.body.email});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      req.flash("error", err.message);
      res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome back " + user.username + "!");
      res.redirect("/dashboard");
    })
  })
});


// LOGIN ROUTE
router.get("/login", function(req, res){
  res.render("login");
});


router.post("/login", passport.authenticate("local",
  {successRedirect: "/dashboard", failureRedirect: "/login"}),
  function(req, res){
});


// LOGOUT
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Successfully Logged Out");
  res.redirect("/login");
});


//DAHSBOARD ROUTE
router.get("/dashboard", middleware.isLoggedIn, function(req, res){
  res.render("dashboard");
});

module.exports = router;