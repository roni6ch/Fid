const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require('./models/user');
const Cards = require('./models/card');
const UserCards = require('./models/user-cards');
const Categories = require('./models/categories');
const Business = require('./models/business');
const Offers = require('./models/offers');

module.exports = router;

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.get('/', (req, res) => {
    res.json('Hello!')
})

router.post('/login', async (req, res) => {
    console.log(req.body);
    const { email, idToken, firstName, photoUrl } = req.body;
    let query = { email };
    let update = {
        $setOnInsert: {
            idToken,
            firstName,
            email,
            photoUrl
        }
    };
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };
    User.findOneAndUpdate(query, update, options, (err, user) => {
        if (err) {
            console.log('login - error findOneAndUpdate', err)
        } else {
            let payload = { subject: user._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ token })
        }
    })
})

router.get('/cards', async (req, res) => {
    const cards = await Cards.find();
    res.status(200).send({
        cards,
        ...(req.query.email ? { userCards: await getUserCars(req.query.email) } : {})
    });
})

async function getUserCars(email) {
    const userCardsIds = await UserCards.findOne(
        { 'email': email }
    );
    const userCards = await Cards.find({
        '_id': { $in: userCardsIds.cards }
    });
    return userCards;
}

router.get('/categories', verifyToken, async (req, res) => {
    const categories = await Categories.find();
    res.status(200).send(categories);
})

router.get('/offers', verifyToken, async (req, res) => {
    const userCards = await UserCards.findOne();
    const offers = await Offers.find({ 'businessId': req.query.businessId, 'cardId': { $in: userCards.cards } });
    const nonOffers = await Offers.find({ 'businessId': req.query.businessId, 'cardId': { $nin: userCards.cards } });
    res.status(200).send({
        offers,
        nonOffers
    });
})

router.get('/business', verifyToken, async (req, res) => {
    const categories = await Categories.findById(req.query.categoryId);
    if (categories && categories.businessIds?.length > 0 && req.query.categoryId) {
        const business = await Business.find({ '_id': { $in: categories.businessIds } });
        return res.status(200).send(business);
    } else if (!req.query.categoryId) {
        const business = await Business.find();
        return res.status(200).send(business);
    }
    return res.status(200).send([]);
})

router.post('/cards', verifyToken, async (req, res) => {
    const { email, cardId } = req.body;
    const query = { email };
    const currentCards = await UserCards.findOne(query);
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    let result = [];
    if (currentCards?.cards) {
        const card = currentCards.cards?.find(card => card === cardId);
        if (card) {
            const filteredCards = currentCards.cards?.filter(card => card !== cardId);
            const update = {
                $set: {
                    cards: filteredCards
                }
            };
            await UserCards.updateOne(query, update, options);
            result = filteredCards;
        } else {
            const update = {
                $set: {
                    cards: [...currentCards.cards, cardId]
                }
            };
            await UserCards.updateOne(query, update, options);
            result = [...currentCards.cards, cardId]
        }
    } else {
        const query = {
            email,
            cards: [cardId]
        }
        await UserCards.create(query);
        result = [cardId]
    }
    res.status(200).send(result);
})

module.exports = router;