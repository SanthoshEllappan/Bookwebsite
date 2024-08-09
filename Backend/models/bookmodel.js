const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    country:{ type:String},
    link:{type:String},
    pages:{type:Number},
    year:{type:Number},
    language:{type:String},
    image:{type:String},
    bookid:{type:String}


});

module.exports = mongoose.model('Book', bookSchema);

