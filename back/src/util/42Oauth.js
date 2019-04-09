const express		      = require('express');
const router		      = express.Router();
const User            = require('../model/User');
const FortyTwoStrategy  = require('passport-42').Strategy;
const passport        = require('passport');


const FORTYTWO_APP_ID = '7f41faded62b4fbbe0b2cc08a72029cc05c590f8cb56edc954382350ee0a4536';
const FORTYTWO_APP_SECRET = '846a2c3199eaf6314c1c7ec88079fa4872e86631442d760278b058c86229ffff';

passport.use(new FortyTwoStrategy({
  clientID: FORTYTWO_APP_ID,
  clientSecret: FORTYTWO_APP_SECRET,
  callbackURL: "http://localhost:8080/auth/42"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate( { ssoid: { intra: profile._json.id.toString() } } ).then(res => {
    if (res) {
      return cb(null, res);
    } else {
      var u = new User({
        firstName: profile._json.first_name,
        lastName: profile._json.last_name,
        ssoid: { intra: profile._json.id.toString() },
        username: profile._json.login + " " + profile._json.pool_month + " " + profile._json.pool_year,
        email: profile._json.email
      });
      u.save().then(res => {
        return cb(null, res);
      }).catch(err => {
      })
    }
  }).catch(err => {
  });
}
));


router.get('/', passport.authenticate('42', { failureRedirect: 'http://localhost:4200/login'}));

router.get('/callback',
  passport.authenticate('42', { failureRedirect: 'http://localhost:4200/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:4200');
});

module.exports = router;