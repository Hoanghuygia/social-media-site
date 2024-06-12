const mongoose = require("mongoose");
const { isEmail } = require("validator");

const usernameValidator = (username) => {
  const regex = /^[a-zA-Z0-9_]+$/;
  return regex.test(username);
};

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minLength: [3, "Username should have at least 3 characters"],
      maxLength: [20, "Username should have at most 20 characters"],
      unique: true,
      validate: {
        validator: usernameValidator,
        message: "Username can only contain letters, numbers, and underscores",
      },
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minLength: [8, "Password should have more than 8 characters"],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: [
      {
        follower_id: { type: mongoose.Types.ObjectId, ref: "User" },
        followAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    followings: [
      {
        following_id: { type: mongoose.Types.ObjectId, ref: "User" },
        followAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    thought: String,
    socket_id: {
      type: String,
    },
    chat_list: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    bio: {
      type: String,
      maxlength: 150,
      default: "",
    },
    status: {
      type: String,
      default: "Offline"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);