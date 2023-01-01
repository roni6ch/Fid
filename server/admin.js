const express = require("express");
const Cards = require('./models/card');
const Category = require('./models/categories');
const Business = require('./models/business');
const Offer = require('./models/offers');

const router = express.Router();

module.exports = router;

router.post('/card', async (req, res) => {    
    const query = req.body;
    const addCard = await Cards.create(query);
    res.status(200).send(addCard);
});

router.post('/category', async (req, res) => {    
    const query = req.body;
    const addCategory = await Category.create(query);
    res.status(200).send(addCategory);
});

router.post('/business', async (req, res) => {    
    const query = req.body;
    const addBusiness = await Business.create(query);
    res.status(200).send(addBusiness);
});

router.post('/offer', async (req, res) => {    
    const query = req.body;
    const addOffer = await Offer.create(query);
    res.status(200).send(addOffer);
});