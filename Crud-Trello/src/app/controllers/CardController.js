
const Card = require('../models/Card');
const {mutipleMongooseToObject} = require('../../util/mongoose.js')

class CardController {

 // [GET] /
 async getCard(req, res, next) {
  try{
    const cards = await Card.find({});
    res.render('home', {
      cards: mutipleMongooseToObject(cards)
    })
  }catch(error){
    next(error);
  }
}

async getCardData(req, res) {
  try {
    const cards = await Card.find({});
    res.json({cards: mutipleMongooseToObject(cards)});
  }
  catch(error){
    res.status(500).json({error: 'Failed to get Card data'})
  }
}

  // [POST] /cards/card
  async addCard(req, res, next) {
    try {
      const { title, trelloId } = req.body;
      const newCard = new Card({ title, trelloId });
      await newCard.save();
      res.status(201).json(newCard);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create Card' });
    }
  }


  // [DELETE] /cards/card/:id
  async deleteCard(req, res, next) {
    try {
      const { id } = req.params;
      await Card.findByIdAndDelete(id);
      res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete Card' });
    }
  }

  // [PATCH] /card/:id
  async updateCard(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const card = await Card.findById(id);
      card.title = title;
      await card.save();
      res.status(200).json({ message: 'Card updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update card' });
    }
  }
}

module.exports = new CardController();