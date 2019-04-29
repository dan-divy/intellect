// utils/models/question.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var question = new mongoose.Schema({
   question:{
     type:String
   },
   answers:{
     type:Array
   },
   subject:{
     type:Number,
     default:0
   },
   date: {
      type: Date,
      default: Date.now
   },
   points:{
     type:Number,
     default:10
   },
   by:{
     type:String
   },
   views: {
     type:Number,
     default:0
   }
});

module.exports = mongoose.model('question', question);

// create the model for users and expose it to our app
