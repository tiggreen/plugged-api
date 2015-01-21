
var express = require('express');
var router = express.Router();


// Twilio Credentials 
var accountSid = process.env.twilio_accountSid;
var authToken = process.env.twilio_authToken;
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken);


var validation = require('../models/validation')

/*
*
* Verify the phone number of a user.
*/
router.post('/phone', function(req, res) {
	
	if (!req.body.phone) next();


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
			  	res.status(500).send({ message: 'Server error.' });
			  }
			  // saved!
			  res.status(200).send({message: 'OK'});
			})
			
		} else {
			console.log(res);
			res.status(502).send({ message: 'Twilio blew up something' });
		}
	});
});


/*
*
* Verify the pin for a given number. Pin is a four digit
* number sent by a user.
*/
router.post('/pin', function(req, res) {

	if (!req.body.pin || !req.body.phone) next();

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
				res.status(200).send({ message: 'OK' });

			} else {
				res.status(500).send({ message: 'Could not verify the pin.' });
			}
		})
});

module.exports = router;

