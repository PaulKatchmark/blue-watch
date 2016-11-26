const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const resourceSchema = new Schema({
  category: {
      _id: String,
     categoryName: String,
     color: String,
 },
  description: String,
  company: String,
  contact: String,
  website: String,
  street: String,
  street2: String,
  city: String,
  state: String,
  zip: Number,
  lat: String,
  long: String

}, {collection: 'resource'});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
