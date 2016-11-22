const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const colorSchema = new Schema({
  pin: String,
  color: String,
  inUse:Boolean
});


const Color = mongoose.model('Color', colorSchema);

module.exports = Color;
