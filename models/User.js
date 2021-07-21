const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User must have a name"],
      min: 5,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "User must have an email"],
      max: 50,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "User must have a password"],
      min: 6,
      max: 20,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  // Only run this function if password was actualy modified
  if (!this.isModified("password")) return next();
  // Encrypt the password with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Deleting the password confirmation
  this.passwordConfirm = undefined;
  next();
});

UserSchema.methods.correctPassword = async function (
  checkedPassword,
  userPassword
) {
  return await bcrypt.compare(checkedPassword, userPassword);
};

module.exports = mongoose.model("User", UserSchema);
