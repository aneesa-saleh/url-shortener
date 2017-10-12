# URL Shortener Microservice
Takes a URL and returns a JSON object with a short URL and original the URL.

## Usage
* Pass a valid URL as a parameter to get a short URL JSON object.
* Pass short URL code to get original URL.
* Passing an invalid URL will return an error JSON.
* Passing an unrecognized short URL will return an error JSON.

### Example

* https://as-url-shortener.glitch.me/new/https://google.com
* https://as-url-shortener.glitch.me/1234

Output:

``` 
{ 
  "Short URL": "https://as-url-shortener.glitch.me/1234", 
  "Original URL": "https://google.com" 
} 
```

Error output:
```
{ 
  "Error": "Code not recognized."
}
```



