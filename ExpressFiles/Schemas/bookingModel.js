const mongoose = require('mongoose');

const bookingModel = new mongoose.Schema({
    date:{
        type: String
    },
    time:{
        type: String
    },
    name:{
        type: String,
        required: [true, 'Please provide booker name'],
        trim: true,
    },
    phone:{
        type: Number
    },
    username:{
        type: String,
        required: [true, 'Please provide your username'],
        trim: true,
    },
    totalPerson:{
        type: Number
    },
    bookStatus:{
        type: String,
        default: "pending"
    }
});

const Booking = mongoose.model('Booking', bookingModel);
module.exports = Booking;