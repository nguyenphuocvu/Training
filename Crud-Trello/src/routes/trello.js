const express = require('express');
const router = express.Router();

const TrelloController = require('../app/controllers/TrelloController');

// Render trang home
router.get('/', TrelloController.renderTrello);

// API Trello
router.get('/trello', TrelloController.getTrello);
router.post('/trello', TrelloController.addTrello);
router.delete('/trello/:id', TrelloController.deleteTrello);
router.patch('/trello/:id', TrelloController.updateTrello);

module.exports = router;
