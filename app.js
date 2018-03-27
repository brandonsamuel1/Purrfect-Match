const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const authRoutes = require("./routes/index");
const felineRoutes = require("./routes/felines");

mongoose.connect("mongodb://localhost/purrfect");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
//app.use(expressSanitizer());
//app.use(methodOverride("_method"));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.use(function(req, res, next){
//   res.locals.currentUser = req.user;
//   res.locals.error = req.flash("error");
//   res.locals.success = req.flash("success");
//   next();
// });

app.use(authRoutes);
app.use("/felines", felineRoutes);


app.listen(process.env.PORT || 8080, function(){
  console.log("Your feline friend awaits...");
});