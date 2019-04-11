const express		      = require('express');
const router		      = express.Router();
const User            = require('../model/User');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const currentUser = require('../util/check');


const GOOGLE_APP_ID = '669911811352-bdsbd20jmanch9e915t6ig1atn7c6lu2.apps.googleusercontent.com';
const GOOGLE_APP_SECRET = 'CdYCIdfJZ32cP6COig1dcchm';

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: GOOGLE_APP_ID,
  clientSecret: GOOGLE_APP_SECRET,
  callbackURL: "http://localhost:8080/auth/google/redirect"
}, (accessToken, refreshToken, profile, done) => {
    console.log('passport callback');
    console.log(profile);
    var Firstname = profile._json.given_name;
  var Lastname = profile._json.family_name;
  var email = profile._json.email;
  console.log('JSON');
  console.log(profile._json.given_name)
    User.findOne( { googleId: profile.id}).then((currentUser) => {
      if (currentUser) {
        console.log('user already exist', currentUser);
        router.post('/login');
        done(null, currentUser);
      } else {
    user = new User({
      "username": profile.displayName,
      "firstname": Firstname,
      "lastname": Lastname,
      "email": email,
      googleId: profile.id
    });
    console.log("user = ", user);
    user.save(
      function(err) {
        if (err) console.error(err);
        return done(err, user);}
    ).then((newUser) => {
      console.log('new user created' + newUser);
      done(null, newUser);
    });
    }
  }
     )})) ;
  
  
  
  router.get('/', passport.authenticate('google', { 
      scope: ['profile', 'email']}
      ));
  
  router.get('/redirect', passport.authenticate('google', { failureRedirect: "http://localhost:4200/login" }),
  (req, res) => {
    // Successful authentication, redirect home.
    console.log('redirect good');

    //comments: utiliser router_user->if(bcrypt.compareSync(password, user_bdd.password)){}
    res.redirect("http://localhost:4200/home")
});
  
  module.exports = router;