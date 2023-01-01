const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const api = require('./api');
const admin = require('./admin');
const cors = require('cors');
const path = require('path');

const PORT = 3000;
const app = express();

app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use('/api', api);
app.use('/admin', admin);


const username = 'Roni691986';
const password = 'qzc9FSR3NJ3m';
const db = `mongodb+srv://${username}:${password}@cluster0.jg8lvff.mongodb.net/test`
mongoose.set('strictQuery', false);
mongoose.connect(db, err => {
    if (err) {
        console.log('error: ', err);
    } else {
        console.log('--===> Connected to mongo DB <===--');
    }
})


app.listen(PORT, () => {
    console.clear();
    console.log('--===> Server running on localhost:' + PORT + ' <===--');
})