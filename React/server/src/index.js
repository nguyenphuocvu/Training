const express = require("express");
require('dotenv').config();
const connectDB = require('./config/db');
const app = express()

const port = process.env.PORT_RUN_MAIN || 3001

connectDB();
app.get('/', (req , res) => {
    return res.render('Hello')
})
app.listen(port, () => {
    console.log('Server is running in port: ', + port)
}) 