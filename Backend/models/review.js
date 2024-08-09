const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    bookid:{type:Number},
    username:{type:String},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('review', reviewSchema);