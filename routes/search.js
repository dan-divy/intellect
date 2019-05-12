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


router.get('/', (req, res, next) => {
    var query = req.query.q;

  if(query) {
    /*var regx = '^'+query+".*";
    var opt = {
      $or:[
        {question:{$regex:regx}},
        {subject:{$regex:regx}},
        {answers:{$regex:regx}}
      ]
    }*/

    query = query.toLowerCase();
    Question
    .find({})
    .exec((err, obj) => {
        obj = obj.filter(q => 
            q.question.toLowerCase().includes(query) ||
            q.subject.toLowerCase().includes(query) ||
            q.answers.filter(a => a.answer.includes(query) || a.answer.endsWith(query) || a.answer.startsWith(query)).length > 0 ||
            q.question.toLowerCase().startsWith(query) ||
            q.subject.toLowerCase().startsWith(query) ||
            q.question.toLowerCase().endsWith(query) ||
            q.subject.toLowerCase().endsWith(query)
        )
        obj = obj.sort((a, b) => {
            return b.answers.length - a.answers.length 
        });
        res.render('main/search',{
        questions:obj,
        search: true
        });
    })
  }
  else {
      next()
  }
})


router.get('/', (req, res) => {
    Question
    .find({})
    .exec(async (err, obj) => {
        let newQuestions = obj.sort((a, b) => {
            return a.answers.length - b.answers.length 
        });
        newQuestions = newQuestions.slice(0, 5);
        res.render('main/search', {questions:newQuestions, search:false});
    })
})

module.exports = router;
