
var express = require('express');
var router = express.Router();


// Twilio Credentials 
var accountSid = process.env.twilio_accountSid;
var authToken = process.env.twilio_authToken;
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken);


var validation = require('../models/validation')


router.post('/phone', function(req, res) {

	console.log(req.body)

	var pin = Math.floor(Math.random()*9000) + 1000;
	 
	// Sending a text message to the requester number.
	client.messages.create({ 
	    to: req.body.phone, 
	    from: "+15162094851", 
	    body: "Your Plugged pin is: " + pin,   
	}, function(err, message) { 
		if (! err) {

			// Once we sent the pin let's record this in the Validation module.
			var record = new validation({ 
				phone: req.body.phone, 
				pin: pin
			});

			record.save(function (err) {
			  if (err) {
			  	res.status(500).send({ error: 'Something blew up' });
			  }
			  // saved!
			  res.status(201).send('Successful! Yaay!');
			})
			
		} else {
			res.status(401).send({ error: 'Twilio blew up something' });
		}
	});
});

router.post('/pin', function(req, res) {

	var query = {
		pin: req.body.pin,
		phone: req.body.phone,
		// Pin is valid only for 30 mins.
		timestamp: { $gt: new Date(Date.now() - (30 * 60000)) }
	};
	validation.findOneAndUpdate(query, { verified: true }, 
		function(err, results) {

			if (! err && results) {

				console.log(results);
				res.status(201).send('Successfully verifed ' + req.body.phone);

			} else {
						res.status(500).send({ error: 'Could not verify the pin.' });
			}
		})
});

module.exports = router;

