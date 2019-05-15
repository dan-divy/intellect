/** Express HTTP Router **/
var express = require('express');
var router = express.Router();
var ta = require('time-ago');
var array_tools = require("array-tools");
/** Other important utilities **/
var Question = require('../utils/models/question');
var User = require('../utils/models/user');

router.get('/', (req, res) => {
  User
  .find({'profile':req.session.user})
  .exec((err, data) => {
    /*for (var i = 0; i < data.notifications.length; i++) {
      data.notifications[i]
    }*/
    res.render('main/notification', {
      data:data[0]
    })
  })
});

// Expose the Express HTTP `index` router to main app.
module.exports = router;
