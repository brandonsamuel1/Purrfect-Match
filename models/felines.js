const mongoose = require("mongoose");

const felinesSchema = new mongoose.Schema({
  name: String,
  image: String,
  age: String,
  breed: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {type: mongoose.Schema.Types.ObjectId, ref: "Comment"}
  ]
});

module.exports = mongoose.model("Felines", felinesSchema);