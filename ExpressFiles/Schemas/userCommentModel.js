const mongoose = require('mongoose');

const userCommentModel = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Please provide your username'],
        trim: true,
    },
    commentTitle:{
        type: String,
        required: [true, 'Please provide a title'],
        trim: true,
    },
    comment:{
        type: String,
        required: [true, 'Please provide a comment'],
        trim: true,
    },
});

const Comment = mongoose.model('Comment', userCommentModel);
module.exports = Comment;