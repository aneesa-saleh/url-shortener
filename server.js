var mongo = require('mongodb').MongoClient;
var express = require('express');
var app = express();


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

var uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds161833.mlab.com:61833/short-urls`;

mongo.connect(uri, function(err, db){
  if (err)
    return console.log('Error: unable to connect to database.');
  
  db.createCollection("mycollection")
  var mycollection = db.collection('mycollection');
  var doc = {
    name: 'aneesa',
    age: 22
  };
  mycollection.insert(doc)
  //console.log(db.url_codes.find())
  //db stuff
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  //console.log('Your app is listening on port ' + listener.address().port);
});
