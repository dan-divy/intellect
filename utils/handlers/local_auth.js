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
    }, (err, profile) => {
      if(err) return cb(err)
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
    },(err, profile) => {
      if(err) return cb(err)
      console.log(bcrypt.compareSync(this.password, profile.password))
      bcrypt.compare(this.password, profile.password,(error ,matches) => {
        if(matches) {
          return cb(null, profile.profile);
        }
        else {
          return cb(null, false);
        }
      })
     })
  }

}


new Login({
  body: {
    username:"undefined_void",
    password:"123",
    firstname:"S",
    lastname:"S"
  }
}, (err, done) => {
  if(err) throw console.error(err);
  //if(!done) res.render('auth/login')
  console.log(done)
})
