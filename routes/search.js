/** Express HTTP Router **/
var express = require('express');
var router = express.Router();
/** Some useful dependencies **/
var passport = require("passport");
var ta = require('time-ago');
var array_tools = require("array-tools");
const Fuse = require('fuse.js')
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
        /*obj = obj.forEach(q => query.split(' ').forEach((word) => {
          if(
            q.question.toLowerCase().includes(word) ||
            q.subject.toLowerCase().includes(word) ||
            q.answers.filter(a => a.answer.includes(word) || a.answer.endsWith(word) || a.answer.startsWith(word)).length > 0 ||
            q.question.toLowerCase().startsWith(word) ||
            q.subject.toLowerCase().startsWith(word) ||
            q.question.toLowerCase().endsWith(word) ||
            q.subject.toLowerCase().endsWith(word)
          ) results.push(q);
        })
        )*/
        var options = {
          shouldSort: true,
          threshold: 0.6,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: [
            "question",
            "subject",
            "answers.answer"
          ]
        };
        var fuse = new Fuse(obj, options); // "list" is the item array
        var results = fuse.search(query);
        /*results = results.sort((a, b) => {
            return b.answers.length - a.answers.length 
        });*/
        res.render('main/search',{
        questions:results,
        query: query,
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
        res.render('main/search', {questions:newQuestions, search:false, query: ""});
    })
})

module.exports = router;
