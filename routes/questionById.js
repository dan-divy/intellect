/** Express HTTP Router **/
var express = require('express');
var router = express.Router();
/** Some useful dependencies **/
var passport = require("passport");
var ta = require('time-ago');
var array_tools = require("array-tools");
/** Other important utilities **/
var User = require('../utils/models/user');
const Question = require('../utils/models/question');
const formParser = require('../utils/form-parser');
const textParser = require('../utils/text-parser');

const subjectConf = require('../config/subject')
const authConf = require('../config/oauth');

/** DISPLAY QUESTIONS **/
router.get('/:id', (req, res) => {
  var query = req.params.id;
  if(query) {
    Question
    .findOne({_id:query})
    .exec((err, obj) => {
      console.log(req.session.user)
      obj.timeago = ta.ago(obj.date);
      obj.answers = obj.answers.sort((a, b) => a.upvotes.length - b.upvotes.length);
      res.render('main/questionById',{
        question:obj,
        user:req.session.user
      });
    })
 }
else {
    res.redirect('/ask')
  }
})

/** POST AN ANSWER **/
router.post('/:id', formParser, (req, res) => {
  var query = req.params.id;
  if(query) {
    Question
    .findOne({_id:query})
    .exec((err, obj) => {
      function makeid(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < length; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      }
      var id = makeid(16)
      console.info(req.session.user);
      obj.answers.push({
        id,
        answer:textParser(req.body.answer),
        by:req.session.user.username,
        date:Date.now,
        upvotes: []
      })
      User
      .findOne({'profile.username': obj.by })
      .exec((error, usr) => {
        if(!usr.notifications) usr.notifications = [];
        usr.notifications.push({
          answer:req.body.answer,
          by:req.session.user.username,
          date:Date.now
        })
        usr = User(usr);
        usr.save((err, result) => {})
        console.log(usr);
        })
      obj = Question(obj);
      obj.save((err, result) => {
        res.redirect(`/question/${result._id}`);
      })
    })
 }
else {
    res.redirect('/ask')
  }
})

// Expose the Express HTTP `index` router to main app.
module.exports = router;
