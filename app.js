var express = require('express');
var app = express();

var party = require('./routes/party');
var media = require('./routes/media');

var bodyParser = require('body-parser')

var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connection opened');
});

mongoose.connect('mongodb://localhost/test');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use('/party', party);
app.use('/media', media);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});