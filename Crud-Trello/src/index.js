const path = require('path');
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars'); 
const cors = require('cors'); 

const app = express(); 
const port = process.env.PORT_RUN_MAIN || 4040;

// Kết nối database
const connectDB = require('./config/db');

const route = require('./routes');

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Xử lý dữ liệu từ form submit
app.use(express.urlencoded({ extended: true }));

// Cấu hình layout
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main', 
  layoutsDir: path.join(__dirname, 'resources/views/layouts'),
  partialsDir: 'views/partials',

}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Route
route(app);

async function main() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`App listening on port http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Failed to connect to the database:", error);
  }
}

main()