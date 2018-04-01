const express = require("express");
const router = express.Router({mergeParams: true});
const Feline = require("../models/felines");
const Comment = require("../models/comments");
const middleware = require("../middleware/index");


//WRITE A COMMENT PAGE
router.get("/new", middleware.isLoggedIn, function(req, res){
  Feline.findById(req.params.id, function(err, feline){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {feline: feline});
    }
  })
});


//ADD COMMENT TO SINGLE FELINE PAGE
router.post("/", function(req, res){
  Feline.findById(req.params.id, function(err, feline){
    if(err){
      console.log(err);
      res.redirect("/felines");
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          req.flash("error", "Something Went Wrong! :(");
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          feline.comments.push(comment._id);
          feline.save();
          req.flash("success", "Successfully Added Comment");
          res.redirect("/felines/" + feline._id);
        }
      })
    }
  })
});


//DELETE COMMENT ON SINGLE FELINE PAGE
router.delete("/:comment_id", middleware.ownComment, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err) {
      res.redirect("back");
    } else {
      res.redirect("/felines/" + req.params.id);
    }
  })
});


module.exports = router;