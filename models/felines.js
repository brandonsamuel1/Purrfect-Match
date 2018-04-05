const mongoose = require("mongoose");

const felineSchema = new mongoose.Schema({
  name: String,
  image: String,
  age: String,
  breed: String,
  description: String,
  isAdopted: { type: Boolean, default: false },
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

module.exports = mongoose.model("Feline", felineSchema);