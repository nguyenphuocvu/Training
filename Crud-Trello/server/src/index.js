const express = require('express');
require('dotenv').config();
const cors = require('cors'); 


const connectDB = require('./config/db'); 
const route = require('./routes'); 

const app = express();
const port = process.env.PORT || 3030; 

// Middleware xử lý JSON
app.use(cors()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// Kết nối database
connectDB();

// Routes
route(app);


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
