const mongoose = require('mongoose');

const menuModel = new mongoose.Schema({
    image:{
        type:String,
        required: [true, 'Please provide item image']
    },
    name:{
        type: String,
        required: [true, 'Please provide category name'],
        trim: true,
    },
    description:{
        type: String,
        required: [true, 'Please provide item description'],
        trim: true,
    },
    price:{
        type: Number
    },
    category:{
        type: String,
    },
    defaultCategory:{
        type: String,
        default:"all"
    }
});

const menu = mongoose.model('menu', menuModel);
module.exports = menu;