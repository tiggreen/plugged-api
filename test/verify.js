var assert = require('assert');
var request = require('supertest');
var express = require('express');

var app = express();

// describe('GET /', function(){
//     it('respond with json', function(done){

//       request(app)
//         .get('/')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /text/)
//         .expect(201, done);
//     })
// })


describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    })
  })
})


describe('hooks', function() {
  before(function() {
    // runs before all tests in this block
  })
  after(function(){
    // runs after all tests in this block
  })
  beforeEach(function(){
    // runs before each test in this block
  })
  afterEach(function(){
    // runs after each test in this block
  })
  // test cases
})