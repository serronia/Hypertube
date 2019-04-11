const express		      = require('express');
const router		      = express.Router();
const User            = require('../model/User');
const FortyTwoStrategy  = require('passport-42');
const passport        = require('passport');


const FORTYTWO_APP_ID = '7f41faded62b4fbbe0b2cc08a72029cc05c590f8cb56edc954382350ee0a4536';
const FORTYTWO_APP_SECRET = '846a2c3199eaf6314c1c7ec88079fa4872e86631442d760278b058c86229ffff';

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});


passport.use(new FortyTwoStrategy({
  clientID: FORTYTWO_APP_ID,
  clientSecret: FORTYTWO_APP_SECRET,
  callbackURL: "http://localhost:8080/auth/42/redirect"
},
(accessToken, refreshToken, profile, done) => {
  var firstname = profile._json.first_name;
  var lastname = profile._json.last_name;
  var email = profile._json.email;

  console.log('passport callback');
  console.log(profile);
  User.findOne(  { fortytwoId: profile.id} ).then(currentUser => {

    if (currentUser) {
      console.log('user already exist', currentUser);
      return done(null, currentUser);
    } else {
      new User({
        firstname: firstname,
        lastname: lastname,
        fortytwoId: profile.id,
        username: profile._json.login ,
        email: email
      })
      .save().then(newUser => {
        console.log('new user created' + newUser);
      done(null, newUser);
      })
    }
  });
}
));


router.get('/', passport.authenticate('42'));

router.get('/redirect',
  passport.authenticate('42', { failureRedirect: 'http://localhost:4200/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:4200/home');
});

module.exports = router;