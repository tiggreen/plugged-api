var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.send('Hello this is our app service API speaking!');
});

module.exports = router;
