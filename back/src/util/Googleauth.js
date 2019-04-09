const express		      = require('express');
const router		      = express.Router();
const User            = require('../model/User');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const GOOGLE_APP_ID = '669911811352-bdsbd20jmanch9e915t6ig1atn7c6lu2.apps.googleusercontent.com';
const GOOGLE_APP_SECRET = 'CdYCIdfJZ32cP6COig1dcchm';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_APP_ID,
  clientSecret: GOOGLE_APP_SECRET,
  callbackURL: "http://localhost:8080/auth/login/google/"
},
function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate( { ssoid: { google: profile._json.id } } ).then(res => {
      if (res) {
        return cb(null, res);
      } else {
        var u = new User({
          firstName: profile._json.first_name,
          lastName: profile._json.last_name,
          ssoid: { google: profile._json.id },
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
  
  
  router.get('/', passport.authenticate('google', { 
      scope: ['https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read'] }
      ));
  
  router.get('/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:4200/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('http://localhost:4200/home');
  });
  
  module.exports = router;