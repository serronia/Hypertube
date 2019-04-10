const express = require('express');
const router = express.Router();
const User = require('../model/User');
const passport = require('passport');
// const mail = require('./util/mail');
const LocalStrategy = require('passport-local');
const Check = require('../util/check');
const mongoose = require('mongoose');
const database = process.env.C_MONGO;
mongoose.connect(database);
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
function(username, password, done) {
    User.findOne({username: username, verified: true}, function(err, user){
        if (err) return done(err);
        if (!user) return done(null, false);
        let hash = bcrypt.compareSync(password, user['password']);
        if (!hash) return done(null, false);
        return done(null, user);
    });
    }
));

router.get('/drop_user', (req, res) => {
	console.log("server hit /drop_user");
  User.remove({}, function (err) {
    if (err) { throw err; }
    console.log('table user supprimée');
  });
});


router.post('/login', (req, res) => {
  console.log("server hit user/login");
  var username = req.body.username;
  var password = req.body.password;
  Check.getPassw(username)
  .then(
    user =>{
      const user_bdd = user.data._doc;
      if(bcrypt.compareSync(password, user_bdd.password)) 
      {
        res.status(200).json({
          id: user.id,
          username: username,
          token: `fake-jwt-token`/*insert real token HERE*/
        });
      }
      else{
        res.status(400).send('Username or password is incorrect');
      }
    }).catch(err=>{
      res.status(400).send('User don\'t exist');
  })
});


router.post('/create', (req, res) => {
  console.log("server hit /adduser");
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var mail = req.body.mail;
  var username = req.body.username;
  var password = req.body.password;
  var verif = req.body.password2;

  let hash = bcrypt.hashSync(password, 10);

  Check.checkUserExists(username, mail).then(resp =>{
    if(resp)
    {
      console.log("ok, n'exist pas");
      if(password == verif){
        let user = new User({
          lastname: lastname,
          firstname: firstname,
          username: username,
          email: mail,
          password : hash
        });
        user.save(error => {
          if (error)
            res.status(400).send("Format error, please re-read your input");
          else
          {
            //mail.sendMail(email, "Creation Success", "Verification", html);
            res.status(201).json({message: 'User created successfully'});
          }
        });
      }
      else
      {
        res.status(400).send("Password and confirmation not identical");
      }
    }
  }).catch(err=>{
    if(err)
      res.status(400).send("Username or mail already exist");
  });
});

//router.get('/modify', (req, res))

/*router.get('/login',
  passport.authenticate('local', { failureRedirect: '/user/fail'}),
  function(req, res) {
    res.status(201).jsonp({"msg": "OK"})
});

router.get('/fail', (req, res) => {
  res.status(200).jsonp( { "msg": "Fail" } );
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect(req.protocol + '://' + req.get('host').split(':')[0] + ':8080');
});*/

module.exports = router;