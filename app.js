var express         = require('express');
var path            = require('path');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var request         = require('request');
var oauthserver     = require('node-oauth2-server');
var multer          = require('multer'); 
var mongoose        = require('mongoose');

// create an error with .status. we
// can then use the property in our
// custom error handler (Connect repects this prop as well)

function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

// creating an express app.
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer()); // for parsing multipart/form-data
app.use(cookieParser());


/*
* Setting up the API-KEY authentication.
*
*/

// map of valid api keys, typically mapped to
// account info with some sort of database like redis.
// api keys do _not_ serve as authentication, merely to
// track API usage or help prevent malicious behavior etc.

/*
var apiKeys = [process.env.API_KEY];

console.log(apiKeys);

// here we validate the API key,

app.all('*', function(req, res, next) {


  var key = req.header('api_key');

  console.log(key);

  // key isn't present
  if (!key) return next(error(400, 'api key required'));

  // key is invalid
  if (!~apiKeys.indexOf(key)) return next(error(401, 'invalid api key'));

  // all good, store req.key for route access
  req.key = key;
  next();
});
*/


/*
* Setting up the mongoDB connections
*
*/ 
var uristring =  process.env.MONGOLAB_URI ||  
                 process.env.MONGOHQ_URL || 
                 'mongodb://localhost/plugged_db';

// Connecting to mongodb.
mongoose.connect(uristring, function(err, res) {
  if(err) {
    console.log('Error connecting to the database.' + err);
  } else {
    console.log('Connected to the database.');
  }
});



var routes = require('./routes/index');
var verify = require('./routes/verify');

app.use('/', routes);
app.use('/verify', verify);


// handling the authorization uses OAuth2.

var memorystore = require('./routes/model.js');

app.oauth = oauthserver({
  model: memorystore, // See below for specification
  grants: ['password'],
  debug: true
});

app.all('/oauth/token', app.oauth.grant());

// app.get('/', app.oauth.authorise(), function (req, res) {
//   res.send('Secret area');
// });

app.use(app.oauth.errorHandler());

/*
* Error Handling
*
*/

// middleware with an arity of 4 are considered
// error handling middleware. When you next(err)
// it will be passed through the defined middleware
// in order, but ONLY those with an arity of 4, ignoring
// regular middleware.
app.use(function(err, req, res, next){
  // whatever you want here, feel free to populate
  // properties on `err` to treat it differently in here.
  res.status(err.status || 500);
  res.send({ error: err.message });
});

// our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use(function(req, res){
  res.status(404);
  res.send({ error: "Lame, can't find that" });
});



module.exports = app;
