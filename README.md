# URL Shortener Microservice
Takes a URL and returns a JSON object with a short URL and original the URL.

## Usage
* Pass a valid URL as a parameter to get a short URL JSON object.
* Pass short URL code to get original URL.
* Passing an invalid URL will return an error JSON.
* Passing an unrecognized short URL will return an error JSON.

### Example
#### Get new URL short code:
* https://as-url-shortener.glitch.me/new/https://google.com

#### Visit URL using short code:
* https://as-url-shortener.glitch.me/9P9QX

#### Sample JSON Output:

``` 
{ 
  "Short URL": "https://as-url-shortener.glitch.me/9P9QX", 
  "Original URL": "https://google.com" 
} 
```

#### Sample Error:
```
{
  "Error": "Code not recognized."
}
```



