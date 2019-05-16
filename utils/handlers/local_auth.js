var User = require('../models/user');
/***
NOTE:

FOR TESTING ONLY!!!!!!!

***/
class Authenticate {
  constructor(request) {

  }

  create(cb) {
    // SIGN UP CODE HERE
    User
    .findOne({
      'profile.username':this.username,
      'profile.service':'local'
    }, (err, profile) => {
      if(err) return cb(err)
      var newUser = new User({
        profile:{
          username:this.username,
          password:newUser.generateHash(this.password),
          firstname:this.firstname,
          lastname:this.lastname
        }
      })
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
      console.log('asd')
      if(err) return cb(err)
      return cb(null, profile)
    })
  }

}

function login(request, cb) {
  // LOGIN CODE HERE
  this.username = request.body.username;
  this.password = request.body.password;
  User
  .find({
    'profile.username':this.username,
    'profile.service':'local'
  })
  .exec((err, profile) => {
    console.log('asd')
    if(err) return cb(err)
    return cb(null, profile)
  })
}
/**
login({
  body: {
    username:"Divy",
    password:"123"
  }
}, (err, done)=> {
  console.log(done)
}) **/
console.log('Starting')
User
.findOne({
  'profile.username':this.username,
  'profile.service':'local'
},(err, profile) => {
  console.log('asd')
  if(err) return cb(err)
  return cb(null, profile)
})
