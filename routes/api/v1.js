/** Express HTTP Router **/
var express = require('express');
var router = express.Router();
var ta = require('time-ago');
var array_tools = require("array-tools");
/** Other important utilities **/
var Question = require('../../utils/models/question');

router.get('/latest', (req, res) => {
  Question
  .find({})
  .exec((err, data) => {
    var latestQuestions = [data[data.length - 1],data[data.length - 2],data[data.length - 3],data[data.length - 4],data[data.length - 5]]
    res.send(latestQuestions);
  })
});

router.get('/upvote/:id/:answerID', (req, res) => {
  console.log('upvote')
  const Qid = req.params.id;
  const Aid = req.params.answerID;
  Question
  .find({_id:Qid})
  .exec((err, data) => {
    data = data[0]
    var answer = data.answers.find(x => x.id == Aid);
    if(answer.upvotes.find(x => x.by.username == req.session.user.username)) {
      answer.upvotes = answer.upvotes.filter(x => x.by.username != req.session.user.username);
    } else {
      answer.upvotes.push({by: req.session.user});
    }
    data = Question(data);
    data.save((err, obj) => {
      res.send(answer.upvotes);
    })
  })
});

// Expose the Express HTTP `index` router to main app.
module.exports = router;
