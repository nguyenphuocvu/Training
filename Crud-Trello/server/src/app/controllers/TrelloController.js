const Trello = require('../models/Trello.js');
const { mutipleMongooseToObject } = require('../../util/mongoose.js');

class TrelloController {
    // [GET] 
    async getTrelloData(req, res) {
        try {
            const trellos = await Trello.find({});
            res.json({ trellos: mutipleMongooseToObject(trellos) });
        } catch (error) {
            res.status(500).json({ error: "Không thể lấy dữ liệu", details: error.message });
        }
    }

    // [POST]
    async addTrello(req, res) {
        try {
            const newTrello = new Trello(req.body);
            await newTrello.save();
            res.status(201).json(newTrello);
        } catch (error) {
            res.status(500).json({ error: 'Thêm không thành công', details: error.message });
        }
    }

    // [DELETE] 
    async deleteTrello(req, res) {
        try {
            const { id } = req.params;
            const deletedTrello = await Trello.findByIdAndDelete(id);
            if (!deletedTrello) {
                return res.status(404).json({ error: 'Không tìm thấy Trello' });
            }
            res.status(200).json({ message: 'Xóa thành công' });
        } catch (error) {
            res.status(500).json({ error: 'Xóa không thành công', details: error.message });
        }
    }

    // [PATCH]
    async updateTrello(req, res) {
        try {
            const { id } = req.params;
            const { title } = req.body;
            const trello = await Trello.findById(id);
            trello.title = title;
            await trello.save();
            res.status(200).json({ message: 'Cập nhật thành công', trello });
        } catch (error) {
            res.status(500).json({ error: 'Không thể cập nhật', details: error.message });
        }
    }
}

module.exports = new TrelloController();
