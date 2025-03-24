const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const route = require('./routes');

//Khởi tạo ứng dụng express
const app = express();
const port = process.env.PORT || 5002;

//Dùng để chia sẽ tài nguyên fontend và back end 
app.use(cors());

// Middleware xử lý JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kết nối database
connectDB();

route(app);

// Running Server
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
