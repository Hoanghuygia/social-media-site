const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: {
            type: String,
            minLength: 1,
        },
    },
);

module.exports = mongoose.model("UserModel", User);
