const mongoose = require("mongoose");

const ArtistSchema = mongoose.Schema(
  {
      name: {
        type: String,
        unique: [true, 'There is already a Artist with this name'],
        required: [true, 'Artist must have a name'],
        min: [2, 'Artist name have to be at least 2 characters long'],
        max: [30, 'Artist name needs to be 30 characters long of shorter']
      },
      Songs: [{
        type: mongoose.Schema.ObjectId,
        ref: "Artist"
      }],
      
  },
  { timestamps: true }
);



module.exports = mongoose.model("Artist", UserSchema);
