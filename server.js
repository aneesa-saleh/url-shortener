let mongo = require('mongodb').MongoClient;
let express = require('express');
let isUrl = require('is-url');
let app = express();

// serve static files from 'public' folder
app.use(express.static('public'));

//db uri
let uri = process.env.DB_URI;

function errorJSON(text){
  return {
            "Error" : text
         };
}

// send home page
app.get(["/","/new"], (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

// add new code
app.get("/:id", (request, response) => {
  let id = Number(request.params.id);
  if(!isNaN(id)){
    mongo.connect(uri, (err, db) => {
      if (err)
        return errorJSON("A database error occured.");

      let url_codes = db.collection('url_codes');
      let result = url_codes.find({"code" : id}).toArray((err, documents) => {
        if (err)
          return errorJSON("A database error occured.");
        else if(documents.length === 0)
          return response.json(errorJSON("Short code not found."));
          
        let doc = documents[0];
        let responseJSON = {
          "Short URL" : `https://as-url-shortener.glitch.me/${doc.code}`,
          "Original URL" : doc.url
        }
        response.json(responseJSON);
      });
      

      //let mycollection = db.collection('mycollection'); 
      // let doc = {
      //   name: 'aneesa',
      //   age: 22
      // };
      //mycollection.insert(doc)

      // url_codes.find().toArray((err, documents) => {
      //   console.log(documents);
      //   });
    });
  }
  else{
      response.json(errorJSON("Invalid short code."));
  }
});

// add new code
app.get("/new/*", (request, response) => {
  let url = request.url.split('/new/')[1];
  if (isUrl(url)){
        response.send(`${url} is VALID`);
  } else {
      response.json(errorJSON("Invalid URL."));
  }
});

//handle 404 (page not found)
app.get('*', function(request, response){
  response.status(404);
  response.sendFile(__dirname + '/views/404.html');
});

// listen for requests :)
let listener = app.listen(process.env.PORT, () => {
  //console.log(`Your app is listening on port ${listener.address().port}`);
});