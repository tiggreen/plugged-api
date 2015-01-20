var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

  res.status(201).send({ message: 'Hello this is the Plugged Messenger API speaking!'});
});

module.exports = router;
