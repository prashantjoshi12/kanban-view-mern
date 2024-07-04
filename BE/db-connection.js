const { default: mongoose } = require("mongoose");
require('dotenv').config();
const mongooseConnection = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
   
}

module.exports = mongooseConnection;