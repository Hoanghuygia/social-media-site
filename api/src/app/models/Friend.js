const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const friend = new Schema(
    {
        username: {
            type: String,
            minLength: 1,
            require: [true, "Please enter a username"],
        },
        age: {
            type: Number,
        },
        gender: { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Friend", friend);
