var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
    age: Number,
    colors: Array,
    name: String
});