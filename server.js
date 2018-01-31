let mongo = require('mongodb').MongoClient;
let express = require('express');
let isUrl = require('is-url');
let shortUrl = require('short-url-generator');
let app = express();

// serve static files from 'public' folder
app.use(express.static('public'));

//db uri
let uri = process.env.DB_URI;

//regex to check an alphanumeric string
let regexAN = /^[a-z0-9]+$/i;

function errorJSON(error){
  return {
            "Error" : error
         };
}

function responseJSON(code, url){
  return {
          "Short URL" : `https://as-url-shortener.glitch.me/${code}`,
          "Original URL" : url
        };
}

function strcmp(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();
  return a < b ? -1 : ( a > b ? 1 : 0);
}

// send home page
app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

//get all records
app.get("/all", (request, response) => {
  console.log('all');
  mongo.connect(uri, (err, db) => {
    if(err)
      return errorJSON("A database error occurred.");
    
    console.log(`got db response ${db}`);
    
    let url_codes = db.collection('url_codes');
    let result = url_codes.find({}).toArray((err, documents) => {
      if(err)
        return errorJSON("A database error occurred.");
      
      if(documents.length === 0)
        return response.json(errorJSON("No records to display."));
      return response.json(documents);
    })
  })
});

// create new short url
app.get("/new", (request, response) => {
  response.redirect('https://as-url-shortener.glitch.me/');
});

// get url from code
app.get("/:id", (request, response) => {
  let id = request.params.id;
  if(regexAN.test(id)){
    mongo.connect(uri, (err, db) => {
      if (err)
        return errorJSON("A database error occured.");

      let url_codes = db.collection('url_codes');
      let result = url_codes.find({"code" : id}).toArray((err, documents) => {
        if (err)
          return errorJSON("A database error occured.");
        
        if(documents.length === 0) // short code not in database
          return response.json(errorJSON("Short code not found."));
          
        let doc = documents[0];
        response.redirect(doc.url);
      });
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
      mongo.connect(uri, (err, db) => {
      if (err)
        return errorJSON("A database error occured.");

      let url_codes = db.collection('url_codes');
      //check if the url is already in the database
      let result = url_codes.find({"url" : url}).toArray((err, documents) => {
        if (err)
          return errorJSON("A database error occured.");
        
        
        if(documents.length === 0){ //not in database
          let code = shortUrl(url).short; //get new short code
          let urlObj = {
            code: code,
            url: url
          };
          url_codes.insert(urlObj); //insert in db
          response.json(responseJSON(code,url)); //send back response
        }
        
        else{ //already in database
          //send back short code
          let code = documents[0].code;
          response.json(responseJSON(code,url)); 
        }
        
      });
    });
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