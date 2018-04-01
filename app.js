const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const User = require("./models/user");
const Felines = require("./models/felines");
const Comment = require("./models/comments");

const authRoutes = require("./routes/index");
const felineRoutes = require("./routes/felines");
const commentRoutes = require("./routes/comments");

mongoose.connect("mongodb://localhost/purrfect");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
//app.use(expressSanitizer());
app.use(methodOverride("_method"));


app.use(require("express-session")({
  secret: "purrfect",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

app.use(authRoutes);
app.use("/felines", felineRoutes);
app.use("/felines/:id/comments", commentRoutes);


app.listen(process.env.PORT || 8080, function(){
  console.log("Your feline friend awaits...");
});