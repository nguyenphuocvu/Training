const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function connect() {
    try {
        await mongoose.connect(process.env.PORT_CONNECT_DB);
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}

module.exports = connect;

