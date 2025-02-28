const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Trello = new Schema({
  title: { type: String, required: true }, 
  isDelete : {type: Boolean, default: false}, 
});

module.exports = mongoose.model('Trello', Trello);
