
/*
* Validation module.
* Used for validating user's phone numbers.
**/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
- phone: The phone number to validate. Input by the user.
- pin:   The random generated number. Should be 4 digits.
_ timestamp: The exact timestamp when the validation request was sent.
- verified: True, if the number if validated. default false.
*/

// MongoDB reserves the _id field in the top level of all documents as a primary key
var validationSchema = new Schema({
  phone:  { type: Number, index: true },
  pin: Number,
  timestamp:   { type: Date, default: Date.now},
  verified: { type: Boolean, default: false },
});

/*
When your application starts up, Mongoose automatically calls ensureIndex
for each defined index in your schema. While nice for development, it is 
recommended this behavior be disabled in production since index creation 
can cause a significant performance impact. Disable the behavior by setting 
the autoIndex option of your schema to false.
*/

// This should be set to false on production.
//animalSchema.set('autoIndex', false);

var Validation = mongoose.model('Validation', validationSchema);

module.exports = Validation