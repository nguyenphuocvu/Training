const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');

const connectDB = require('./config/db');
const route = require('./routes');

const app = express();
const port = process.env.PORT || 5001;

// Middleware xử lý JSON
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Kết nối database
connectDB();

// API routes
route(app);


// Phục vụ static files từ folder "client"
app.use(express.static(path.join(__dirname, '../client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});


// Chạy server
async function main() {
  try {
    app.listen(port, () => {
      console.log(`Server chạy tại: http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
}

main();
