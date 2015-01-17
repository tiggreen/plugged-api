## Plugged. 


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

In Development...

## Tests

Describe and show how to run the tests with code examples.

## Contributors

Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable.

## License

MIT