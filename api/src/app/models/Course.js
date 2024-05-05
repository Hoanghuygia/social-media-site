const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const Course = new Schema({
    name: {type: String, minLength: 1},
    description: {type: String, default: "Still need updated"},
    image: String,
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
})

module.exports = mongoose.model('Course', Course);