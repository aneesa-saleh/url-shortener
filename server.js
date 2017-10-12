let mongo = require('mongodb').MongoClient;
let express = require('express');
let app = express();

// serve static files from 'public' folder
app.use(express.static('public'));

// send home page
app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

//db uri
let uri = process.env.DB_URI;

mongo.connect(uri, (err, db) => {
  if (err)
    return console.log(`Error: ${err}`);
  
  let url_codes = db.collection('url_codes');
  
  //let mycollection = db.collection('mycollection'); 
  // let doc = {
  //   name: 'aneesa',
  //   age: 22
  // };
  //mycollection.insert(doc)
  
  // url_codes.find().toArray((err, documents) => {
  //   console.log(documents);
  //   });
})

// listen for requests :)
let listener = app.listen(process.env.PORT, () => {
  //console.log(`Your app is listening on port ${listener.address().port}`);
});