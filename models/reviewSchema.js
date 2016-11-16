const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reviewSchema = new Schema({
  resource_id: {type: Schema.Types.ObjectId},
  rating: Number,
  comments: {type: String, maxlength: 200}
});


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
