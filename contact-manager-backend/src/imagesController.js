Image = require('./imageModel');
const multer = require('multer');
const fs = require('fs');

//upload image
exports.upload = (req, res) => {
  var upload = multer({dest:'./files', filename: function ( req, file, cb ) {
    cb( null, file.originalname );
  }}).any();
  upload(req, res, function(err) {
    if (err) {
      res.json(err);
    }
    let file = req.files[0]
    let image = new Image();

    image.img.data = fs.readFileSync(file.path);
    image.img.contentType = file.mimetype;
    image.img.name = file.path;

    image.save((err) => {
      if (err) {
        res.json(err);
      }
      res.json({
        message: 'Image uploaded!',
        data: image
      });
    });
  });
};