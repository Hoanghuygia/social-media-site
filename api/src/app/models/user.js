const mongoose = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
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
    thought: String,
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
      maxLength: 50,
    },
    city: {
      type: String,
      maxLength: 50,
    },
    from: {
      type: String,
      maxLength: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
    status: {
      type: String,
      default: "Offline"
    },
    socket_id: {
      type: String,
    },
    chat_list: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    firstname: {
      type: String,
      maxLength: 50,
      required: true,
    },
    lastname: {
      type: String,
      maxLength: 50,
      required: true,
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("User", UserSchema);
