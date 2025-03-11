const express = require('express');
const cors = require('cors'); // Thêm CORS
require('dotenv').config();

const connectDB = require('./config/db'); 
const route = require('./routes'); 

const app = express();
const port = process.env.PORT || 3030; 

// Middleware
app.use(cors({ origin: '*', methods: 'GET,POST,DELETE,PATCH' })); // Cho phép mọi origin
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Hỗ trợ JSON payload

// Kết nối database
connectDB();

// Routes
route(app);

// Trả về phản hồi cho OPTIONS để tránh Preflight Request
app.options('*', (req, res) => {
    res.sendStatus(204);
});

// Chạy server
async function main() {
  try {
    app.listen(port, () => {
      console.log(`Runing server : http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
}

main();
