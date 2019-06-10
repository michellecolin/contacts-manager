var mongoose = require('mongoose');

// Setup schema
var contactSchema = mongoose.Schema({
    image: {},
    name: {
      type: String,
      required: true
    },
    nickname: String,
    methods: []
});

// Export Contact model
var Contact = module.exports = mongoose.model('contact', contactSchema);
module.exports.get = (callback, limit) => {
  Contact.find(callback).limit(limit);
}