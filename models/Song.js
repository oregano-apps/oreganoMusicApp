const mongoose = require("mongoose");
const userModel = require('./User')

const SongSchema = mongoose.Schema(
  {
      name: {
        type: String,
        unique: [true, 'There is already a song with this name'],
        required: [true, 'Song must have a name'],
        min: [2, 'Song name have to be at least 2 characters long'],
        max: [30, 'Song name needs to be 30 characters long of shorter']
      },
      artist: {
        type: mongoose.Schema.ObjectId,
        ref: "Artist"
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
      },
      length: {
          type: String,
          required: [true, 'Song must have a length']
      },
      audio: {
          type: String,
          required: [true, 'Song must have an audio']
      },
      backgroundPicture: {
          type: String
      },
  },
  { timestamps: true }
);



module.exports = mongoose.model("Song", UserSchema);
