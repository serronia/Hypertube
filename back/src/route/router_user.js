const express = require('express');
const router = express.Router();
const User = require('../model/User');
const passport = require('passport');
// const mail = require('./util/mail');
const LocalStrategy = require('passport-local');

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

router.post('/create', function(req, res, next) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  let hash = bcrypt.hashSync(password, 10);
  let verification = bcrypt.hashSync(hash + Math.floor(Math.random() * 2048), 10);
    const user = new User({
      email: email,
      password: hash,
      verification_key: verification,
      firstName: firstname,
      lastName: lastname,
      username: username
    });
    user.save().then((result) => {
        mail.sendMail(email, "Creation Success", "Verification", html);
        res.status(201).json({message: "User added Success"});
    })
    .catch(err => {
        res.status(201).json({message: "User Not added"});
    })
});

router.get('/login',
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
});

module.exports = router;