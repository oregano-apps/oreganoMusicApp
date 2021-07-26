const catchAsync = require("./../utils/catchAsync");
const userModel = require("./../models/User");
const appError = require("./../utils/appError");
const jwt = require("jsonwebtoken");
const spotifyController = require('./../controllers/spotify')

// Make a json web token //
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

exports.singup = catchAsync(async (req, res, next) => {
  console.log(req.body);
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
  const { email, password } = req.body;

  // 1) Check if the email and the password actualy exists
  if (!email || !password) {
    return next(new appError("Please provide an email and password!", 400));
  }

  // 2) Check if the user exists && if the password is correct
  const user = await userModel.findOne({ email: email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new appError("Incorrect email or password", 401));
  }

  // 3) Send the JWT to the client
  const token = signToken(user._id);
  const spotifyToken = spotifyController.login_to_spotify()

  res.status(201).json({ status: "success", token, spotifyToken });


});


