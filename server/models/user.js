const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: String,
    photoUrl: String,
    email: String,
    idToken: String,
})

module.exports = mongoose.model('user', userSchema, 'users')