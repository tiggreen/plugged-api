## Plugged API

### Plugged is a RESTful API for a messaging app. 
#### Not released yet but under active development.

The Plugged API is organized around REST. The API uses HTTP response codes to indicate API responses and errors. JSON will be returned in all responses from the API, including errors.

To make the Plugged API more accessible we provide a test API-KEY.


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

### Socket.IO channels.

We have a short WebSocket channel open via socket.io.
It listens on the channel called 'message'.

This is how the server code looks like at our side.

```javascript
io.on('connection', function(socket){
  console.log('a user connected via WebSocket.');

  socket.on('message', function(msg){
    console.log('message: ' + msg);
    socket.emit('reply', 'This is a message via socket.io server. Yaaay.');
  });
});
```

You can easily implement a client that talks to our server. An example client code
is below. 

```javascript
<script>
  var socket = io.connect("https://plugged-api.herokuapp.com");

    socket.emit('message', { my: 'hello world' });

    socket.on('reply', function(msg){
      console.log(msg);
    });
</script>
```

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

