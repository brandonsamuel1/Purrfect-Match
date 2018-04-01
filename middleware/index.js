const Felines = require("../models/felines");
const Comment = require("../models/comments");
const middlewareObj = {}

middlewareObj.ownFeline = function(req, res, next){
  if(req.isAuthenticated()){
    Felines.findById(req.params.id, function(err, foundFeline){
      if(err){
        req.flash("error", "Feline Not Found!");
        res.redirect("/felines");
      } else {
        if(foundFeline.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash("error", "You Do Not Have Permission");
          res.redirect("/felines");
        }
      }
    });
  } else {
    req.flash("error", "You need to be Logged in!")
    res.redirect("back");
  }
};



middlewareObj.ownComment = function(req, res, next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        res.redirect("back");
      } else {
        if(foundComment.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash("error", "You Do Not Have Permission");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You Need To Be Logged In");
    res.redirect("back");
  }
};




middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  //req.flash("error", "Please Login!");
  res.redirect("/login");
};


module.exports = middlewareObj