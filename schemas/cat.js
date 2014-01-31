var mongoose = require('mongoose');

module.exports = mongoose.Schema({
    age: Number,
    colors: Array,
    name: String
});