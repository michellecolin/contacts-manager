let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
var cors = require('cors');

// Initialize the app
let app = express();
let apiRoutes = require('./api-routes');

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//CORS
app.use(cors());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  // Setup server port
  
});

var port = process.env.PORT || 8080;
app.get('/', (req, res) => res.send('Hello World with Express'));
app.use('/api', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running RestHub on port " + port);
});

