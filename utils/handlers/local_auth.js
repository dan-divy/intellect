var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
/***
NOTE:

FOR TESTING ONLY!!!!!!!

***/
class Register {
  constructor(request, cb) {
    // SIGN UP CODE HERE
    this.username = request.body.username;
    this.password = request.body.password;
    this.firstname = request.body.firstname;
    this.lastname = request.body.lastname;
    User
    .findOne({
      'profile.username':this.username,
      'profile.service':'local'
    }).then((err, profile) => {
      if(err) return cb(err);
      if(profile) return cb(null, false);
      else {
      var newUser = new User()
      newUser.profile = {
        username:this.username,
        firstname:this.firstname,
        lastname:this.lastname,
        password: newUser.generateHash(this.password),
        service:'local'
      }
      newUser.save((error, done) => {
        return cb(null, done)
      })
    }

    })
    .catch((e) => {
      return cb(e);
    })
  }

}

class Login {
  constructor(request, cb) {
    // LOGIN CODE HERE
    this.username = request.body.username;
    this.password = request.body.password;
    User
    .findOne({
      'profile.username':this.username,
      'profile.service':'local'
    })
    .then((profile) => {
      if(profile) {
        bcrypt.compare(this.password, profile.profile.password,(error ,matches) => {
          if(matches) {
            return cb(null, profile.profile);
          }
          else {
            return cb(null, false);
          }
        })
      }
      else {
        return cb(null, false);
      }
     })
     .catch((e) => {
       return cb(e);
     })
  }

}

function expressLogin(req, res, next) {
  if(req && res && next) {
   new Login(req, (err, done) => {
    if(err) return res.redirect('/authorize?error=internal');
    if(!done) return res.redirect('/authorize?error=wrong_credentials');
    req.session.user = done;
    return next();
  })
}
}

module.exports = {
  login:Login
}
