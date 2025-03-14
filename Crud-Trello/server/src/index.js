const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const route = require('./routes');

const app = express();
const port = process.env.PORT || 5001;


app.use(cors());

// Middleware xử lý JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kết nối database
connectDB();

// Định tuyến API
route(app);

// Chạy server
async function main() {
  try {
      app.listen(port, () => {
          console.log(`Running server: http://localhost:${port}`);
      });
  } catch (error) {
      console.error("Unable to connect to database:", error);
  }
}

main();
