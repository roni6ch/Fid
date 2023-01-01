const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const categoriesSchema = new Schema({
    name: String,
    photoUrl: String,
    businessIds: Array
})

module.exports = mongoose.model('category', categoriesSchema, 'categories')