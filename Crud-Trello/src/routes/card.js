const express = require('express');
const router = express.Router();

const CardController = require('../app/controllers/CardController');

//Render Card
router.get  ('/', CardController.renderCard)

//API Card
router.get('/card', CardController.getCard);
router.post('/card', CardController.addCard);
router.delete('/card/:id', CardController.deleteCard);
router.patch('/card/:id', CardController.updateCard);


module.exports = router;
