Contact = require('./contactModel');
Image = require('./imageModel');
const fs = require('fs');

//Get all contacts stored
exports.index = (req, res) => {
  Contact.get((err, contacts) => {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      });
    }
    res.json({
      status: 'success',
      message: 'Contacts retrieved successfully',
      data: contacts
    });
  });
};

// Create a new contact
exports.new = (req, res) => {
  let contact = new Contact();
  contact.image = contact.image;
  contact.name = req.body.name ? req.body.name : contact.name;
  contact.nickname = req.body.nickname;
  contact.methods = req.body.methods;

  // save the contact and check for errors
  contact.save((err) => {
    if (err) {
      res.json(err);
    }
    res.json({
      message: 'New contact created!',
      data: contact
    });
  });
};

// Get specific contact
exports.view = (req, res) => {
  Contact.findById(req.params.contact_id, (err, contact) => {
    if (err) {
      res.send(err);
    }
    console.log('aqui', contact.image);
    if (contact.image) {
      Image.findById(contact.image, (err, image) => {
        if (err) {
          res.send(err);
        }
        var base64 = (image.img.data.toString('base64'));

        contact.image = {
          data: base64,
          mime: image.img.contentType
        };

        res.json({
          message: 'Contact details loaded',
          data: contact
        });
      });
    } else {
      res.json({
        message: 'Contact details loaded',
        data: contact
      });
    }
  });
};

// Update contact
exports.update = (req, res)  => {
  Contact.findById(req.params.contact_id, (err, contact) => {
    if (err) {
      res.send(err);
    }
    contact.image = req.body.image;
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.nickname = req.body.nickname;
    contact.methods = req.body.methods;

    // save the contact and check for errors
    contact.save((err) => {
      if (err) {
        res.json(err);
      }
      res.json({
        message: 'Contact Info updated',
        data: contact
      });
    });
  });
};

// Delete a contact
exports.delete = (req, res) => {
  Contact.remove({
    _id: req.params.contact_id
  }, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json({
      status: 'success',
      message: 'Contact deleted'
    });
  });
};