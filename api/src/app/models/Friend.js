const { default: mongoose } = require('mongoose');

const Schema = mongoose.Schema;

const Friend = new Schema({
    usename: { type: String, minLength: 1 },
    age: {
        type: Number,
    },
    gender: { type: String },
});

module.exports = mongoose.model('Friend', Friend);
