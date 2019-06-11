const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./api-routes');
Image = require('./imageModel');

// Initialize the app
const app = express();

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // Configure bodyparser to handle post requests
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  //CORS
  app.use(cors());
  app.use('/api', apiRoutes);

  var port = process.env.PORT || 8080;
  app.get('/', (req, res) => res.send('Hello World with Express'));
  
  // Launch app to listen to specified port
  app.listen(port, function () {
    console.log("Running RestHub on port " + port);
  });
});



