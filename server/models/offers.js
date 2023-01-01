
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const offersSchema = new Schema({
    businessId: String,
    cardId: String,
    description: String,
    link: String
})

module.exports = mongoose.model('offer', offersSchema, 'offers')