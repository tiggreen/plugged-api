## Plugged API

### Plugged is a RESTful API for a messaging app. 
#### Not released yet but under active development.

The Plugged API is organized around REST. The API uses HTTP response codes to indicate API responses and errors. JSON will be returned in all responses from the API, including errors.

To make the Plugged API to more accessible we provide a test API.


### HTTP Status Code Summary

- 200 OK - Everything worked as expected.
- 400 Bad Request - Often missing a required parameter.
- 401 Unauthorized - No valid API key provided.
- 402 Request Failed - Parameters were valid but request failed.
- 404 Not Found - The requested item doesn't exist.
- 500, 502, 503, 504 Server errors. Somethine occured our server end.



 
## Installation

Download the .zip of the project and extract it.

Go to the directory via your terminal of choice and run - 

```
sudo npm install
```

This will install all the required modules of the service.

I assume you have **npm** (Node Package Manager) installed. If you don't
then you just need to install Node.js and npm comes with it.


After the modules are installed make sure **node_modules** directory is created in your current dir. 

The last step is to run the server -   

```
./bin/www
```

This will start the server on your localhost at port number 3000. 

```
localhost:3000
```

You're all set.


## API Reference

### Verify a phone number.

```javascript
POST  https://plugged-api.herokuapp.com/verify/phone

REQ HEADER
{ 
	Content-Type: application/json
}

REQ BODY
{
  phone: your_phone_number
}

```

After requesting to verify your phone number you will get a pin as a text message.
Once you have the pin, you can use the following endpoint to finish your phone number
verification.

### Verify the pin. 

```javascript
POST  https://plugged-api.herokuapp.com/verify/pin

REQ HEADER
{ 
	Content-Type: application/json
}

REQ BODY
{
  phone: your_phone_number,
  pin: your_pin
}

```

Please keep in mind that pins are valid only for 30 min.

In Development...

## Tests

All tests are implemented using [Mocha](http://mochajs.org/) framework.

To run all the test simply run

```
mocha
```

on the terminal. 

## Contributors

@tiggreen

## License

MIT
The Stripe API is organized around REST. Our API is designed to have predictable, resource-oriented URLs and to use HTTP response codes to indicate API errors. We use built-in HTTP features, like HTTP authentication and HTTP verbs, which can be understood by off-the-shelf HTTP clients, and we support cross-origin resource sharing to allow you to interact securely with our API from a client-side web application (though you should remember that you should never expose your secret API key in any public website's client-side code). JSON will be returned in all responses from the API, including errors (though if you're using API bindings, we will convert the response to the appropriate language-specific object).
To make the Stripe API as explorable as possible, accounts have test-mode API keys as well as live-mode API keys. These keys can be active at the same time. Data created with test-mode credentials will never hit the credit card networks and will never cost anyone money.


### HTTP Status Code Summary

- 200 OK - Everything worked as expected.
- 400 Bad Request - Often missing a required parameter.
- 401 Unauthorized - No valid API key provided.
- 402 Request Failed - Parameters were valid but request failed.
- 404 Not Found - The requested item doesn't exist.
- 500, 502, 503, 504 Server errors - something went wrong on Stripe's end.

Plugged is a RESTful API for a messaging app. Not released yet but
under avtive development.


## Installation

Download the .zip of the project and extract it.

Go to the directory via your terminal of choice and run - 

```
sudo npm install
```

This will install all the required modules of the service.

I assume you have **npm** (Node Package Manager) installed. If you don't
then you just need to install Node.js and npm comes with it.


After the modules are installed make sure **node_modules** directory is created in your current dir. 

The last step is to run the server -   

```
./bin/www
```

This will start the server on your localhost at port number 3000. 

```
localhost:3000
```

You're all set.


## API Reference

### Verify a phone number.

```javascript
POST  https://plugged-api.herokuapp.com/verify/phone

REQ HEADER
{ 
	Content-Type: application/json
}

REQ BODY
{
  phone: your_phone_number
}

```

After requesting to verify your phone number you will get a pin as a text message.
Once you have the pin, you can use the following endpoint to finish your phone number
verification.

### Verify the pin. 

```javascript
POST  https://plugged-api.herokuapp.com/verify/pin

REQ HEADER
{ 
	Content-Type: application/json
}

REQ BODY
{
  phone: your_phone_number,
  pin: your_pin
}

```

Please keep in mind that pins are valid only for 30 min.

In Development...

## Tests

All tests are implemented using [Mocha](http://mochajs.org/) framework.

To run all the test simply run

```
mocha
```

on the terminal. 

## Contributors

@tiggreen

## License

MIT