var mongoose = require('mongoose');
// Setup schema
var contactSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    nickname: String,
    email: String,
    phone: String,
    facebook: String,
    whatsapp: String
});
// Export Contact model
var Contact = module.exports = mongoose.model('contact', contactSchema);
module.exports.get = (callback, limit) => {
  Contact.find(callback).limit(limit);
}