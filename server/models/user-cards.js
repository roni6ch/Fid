const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userCardsSchema = new Schema({
    email: String,
    cards: Array,
})

module.exports = mongoose.model('user_card', userCardsSchema, 'users_cards')