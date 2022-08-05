const catchAsync = require("./../utils/catchAsync");
const userModel = require("./../models/User");
const appError = require("./../utils/appError");
const jwt = require("jsonwebtoken");
const spotifyController = require('./../controllers/spotify')

// Make a json web token //
//process.env.JWT_SECRET
//
const signToken = id => {
  return jwt.sign({ id }, "i-walking-on-the-same-street-and-its-looking-like-it-looks-everyday", {
    expiresIn: "90d"
  });
};

exports.singup = catchAsync(async (req, res, next) => {
  const user = await userModel.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    admin: req.body.isAdmin,
  });

  const token = signToken(user._id);
  res.status(201).json({ status: "success", user, token });
});

exports.login = catchAsync(async (req, res, next) => {
  const { password, username } = req.body;

  // 1) Check if the email and the password actualy exists
  if (!username || !password) {
    return next(new appError("Please provide a username and password!", 400));
  }

  // 2) Check if the user exists && if the password is correct
  const user = await userModel.findOne({ username: username }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new appError("Incorrect email or password", 401));
  }

  // 3) Send the JWT to the client
  const token = signToken(user._id);
  res.status(201).json({ status: "success", token, user });
});

exports.likeSong = catchAsync(async (req, res, next) => {
  const user = await userModel.findById(req.body.userId)
  if (req.body.alreadyFavorite == true){
    await userModel.updateOne( { _id: user._id }, {$set: { lovedSongs: user.lovedSongs.filter(
      (song) => song !== req.body.song
    ) }})
    res.status(200).json({status: "success", message: "The song has liked by you!"})
  } else {
    await userModel.updateOne( { _id: user._id }, {$set: { lovedSongs: [...user.lovedSongs, req.body.song] }})
    res.status(200).json({status: "success", message: "The song has liked by you!"})
  }
})


