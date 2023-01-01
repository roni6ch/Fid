
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const businessSchema = new Schema({
    name: String,
    photoUrl: String,
    offersIds: Array
})

module.exports = mongoose.model('business', businessSchema, 'business')