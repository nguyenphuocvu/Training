
const express = require('express');
const router = express.Router();
const TrelloController = require('../app/controllers/TrelloController');

// API 
router.get('/trello', TrelloController.getTrelloData); 
router.post('/trello', TrelloController.addTrello);
router.delete('/trello/:id', TrelloController.deleteTrello); 
router.patch('/trello/:id', TrelloController.updateTrello); 

module.exports = router;


