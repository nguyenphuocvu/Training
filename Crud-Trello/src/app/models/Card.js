const mongoose = require('mongoose');

const Card = new mongoose.Schema({
    title: { type: String, required: true },
    trelloId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trello', required: true }
});

module.exports = mongoose.model('Card', Card);