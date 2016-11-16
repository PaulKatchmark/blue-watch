const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const resourceSchema = new Schema({
  category_id: {type: Schema.Types.ObjectId},
  description: String,
  company: String,
  contact: String,
  website: String,
  street: String,
  city: String,
  state: String,
  zip: Number,

});


const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
