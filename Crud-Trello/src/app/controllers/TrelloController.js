const Trello = require('../models/Trello.js');

class TrelloController {
  // [GET] / render trang home
  async renderTrello(req, res) {
    return res.render('home'); 
  }

  // [GET] /trello - Lấy danh sách Trello
  async getTrello(req, res, next) {
    try {
      const trellos = await Trello.find({});
      return res.json(trellos);
    } catch (error) {
      next(error);
    }
  }

  // [POST] /trello 
  async addTrello(req, res) {
    try {
      const newTrello = new Trello(req.body);
      await newTrello.save();
      const trellos = await Trello.find({});
      res.status(201).json({ newTrello, trellos });
    } catch (error) {
      res.status(500).json({ error: 'Thêm không thành công' });
    }
  }

  // [DELETE] /trello/:id 
  async deleteTrello(req, res) {
    try {
      const { id } = req.params;
      await Trello.findByIdAndDelete(id);
      res.status(200).json({ message: 'Xóa thành công' });
    } catch (error) {
      res.status(500).json({ error: 'Xóa không thành công' });
    }
  }

  // [PATCH] /trello/:id 
  async updateTrello(req, res) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const trello = await Trello.findById(id);

      if (!trello) {
        return res.status(404).json({ error: 'Không tìm thấy Trello' });
      }

      trello.title = title;
      await trello.save();
      res.status(200).json({ message: 'Update thành công' });
    } catch (error) {
      res.status(500).json({ error: 'Không thể update' });
    }
  }
}

module.exports = new TrelloController();
