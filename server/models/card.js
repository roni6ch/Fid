const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const cardSchema = new Schema({
    name: String,
    photoUrl: String,
    type: String,
})

module.exports = mongoose.model('card', cardSchema, 'cards')