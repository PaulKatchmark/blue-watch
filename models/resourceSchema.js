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
  city: String,
  state: String,
  zip: Number,

}, {collection: 'resource'});
//not sure if need this, and would need to wrap address fields in object named location
//resourceSchema.index({location: '2dsphere'});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
