const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authRoutes = require("./routes/index");


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
//app.use(expressSanitizer());
//app.use(methodOverride("_method"));

app.use(authRoutes);


app.listen(process.env.PORT || 8080, function(){
  console.log("Your Feline friend awaits...");
});