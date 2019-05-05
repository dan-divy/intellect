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

// Expose the Express HTTP `index` router to main app.
module.exports = router;
