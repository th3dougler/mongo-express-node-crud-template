const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateSchema = new Schema({
    string_input: String,
    number_input: Number,
    date_input: Date,
    array_input: [String],
    boolean_input: Boolean,
})

module.exports = mongoose.model("collectionTemplate", templateSchema);