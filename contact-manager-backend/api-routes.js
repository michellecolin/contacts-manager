let router = require('express').Router();

// Set default API response
router.get('/', (req, res) => {
  res.json({
    status: 'API Its Working',
    message: 'Welcome to RESTHub crafted with love!',
  });
});
// Import contact controller
var contactController = require('./contactController');
var imagesController = require('./imagesController');

// Contact routes
router.route('/contacts')
  .get(contactController.index)
  .post(contactController.new);
router.route('/contacts/:contact_id')
  .get(contactController.view)
  .patch(contactController.update)
  .put(contactController.update)
  .delete(contactController.delete);
router.route('/upload')
  .post(imagesController.upload);
  
// Export API routes
module.exports = router;