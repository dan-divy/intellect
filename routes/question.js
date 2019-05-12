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

/** QUESTIONS HOME PAGE **/
router.get('/', (req, res) => {
    res.render('main/question',{
        questions:false
    })
})

/** POST A QUESTION HERE **/
router.post('/',formParser, (req, res) => {
  console.log(req.body);
  var newQuestion = new Question({
    question:req.body.question,
    answers:[],
    subject:subjectConf[req.body.subject],
    points:req.body.points,
    by:req.session.user.username,
    views:0
  })
  newQuestion.save((err, q) => {
    if(err) {
      console.error(err);
      return;
    }
    res.redirect(`/question/${q._id}`);
  })
})

// Expose the Express HTTP `index` router to main app.
module.exports = router;
