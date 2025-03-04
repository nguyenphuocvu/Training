const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Trello = new Schema({
  title: { type: String, required: true }, 
});

module.exports = mongoose.model('Trello', Trello);
