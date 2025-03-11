const express = require('express');
const router = express.Router();

const CardController = require('../app/controllers/CardController');


//API Card
router.get('/card', CardController.getCardData);
router.post('/card', CardController.addCard);
router.delete('/card/:id', CardController.deleteCard);
router.patch('/card/:id', CardController.updateCard);


module.exports = router;
