var mongoose = require('mongoose');

// Setup schema
var imageSchema = mongoose.Schema({
  img: { 
    data: Buffer, 
    contentType: String,
    name: String 
  }
});

// Export Image model
var Image = module.exports = mongoose.model('image', imageSchema);
module.exports.get = (callback, limit) => {
  Image.find(callback).limit(limit);
}