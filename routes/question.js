/** Express HTTP Router **/
var express = require('express');
var router = express.Router();
/** Some useful dependencies **/
var passport = require("passport");
var ta = require('time-ago');
var array_tools = require("array-tools");
/** Other important utilities **/
const User = require('../utils/handlers/user');
const Question = require('../utils/handlers/question');

const authConf = require('../config/oauth.js');

router.get('/', (req, res) => {
  var query = req.query.q;
  if(query) {
    Question
    .find({})
    .exec((err, obj) => {
      res.render('main/question',{
        questions:obj
      });
    })
  }
  else {
    res.render('main/question',{
        questions:false
    })
  }
})

// Expose the Express HTTP `index` router to main app.
module.exports = router;
