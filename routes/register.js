var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

/* POST register. */
router.post('/', function(req, res) {
   console.log(req.body);
   res.json(req.body);
});

module.exports = router;
