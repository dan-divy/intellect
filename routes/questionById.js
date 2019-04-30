/** Express HTTP Router **/
var express = require('express');
var router = express.Router();
/** Some useful dependencies **/
var passport = require("passport");
var ta = require('time-ago');
var array_tools = require("array-tools");
/** Other important utilities **/
const Question = require('../utils/models/question');
const formParser = require('../utils/form-parser');

const subjectConf = require('../config/subject')
const authConf = require('../config/oauth');

/** DISPLAY QUESTIONS **/
router.get('/:id', (req, res) => {
  var query = req.params.id;
  //if(query) {
    Question
    .findOne({_id:query})
    .exec((err, obj) => {
      console.log(obj)
      res.render('main/questionById',{
        question:obj
      });
    })
//  }
  //else {
//    res.redirect('/ask')
  //}
})


// Expose the Express HTTP `index` router to main app.
module.exports = router;
