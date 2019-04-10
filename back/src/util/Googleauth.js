const express		      = require('express');
const router		      = require('express').Router();
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
    User.findOne( { googleId: profile.id}).then((currentUser) => {
      if (currentUser) {
        console.log('user already exist', currentUser);
        done(null, currentUser);
      } else {
    new User({
      username: profile.displayName,
      googleId: profile.id,
      firstName: profile._json.given_name,
      lastName: profile.name.familyName
    }).save().then((newUser) => {
      console.log('new user created' + newUser);
      done(null, newUser);
    });
    }
  }
     )})) ;
  
  
  /*User.findOne( { googleId: profile.id}).then((currentUser) => {
      if (currentUser) {
        console.log('user already exist');
        return done(null, res);
      } else {
        new User({
          firstName: profile._json.given_name,
          lastName: profile._json.family_name,
          ssoid: { google: profile.id },
          username: profile.displayName,
          email: profile.email
        })
        .save(error => {
          if (error)
            res.status(400).send("Format error, please re-read your input");
          else
          {
            //mail.sendMail(email, "Creation Success", "Verification", html);
            console.log('new user created');
            res.status(201).json({message: 'User created successfully'});
          }
        });
      };
    }).catch(err => {
    });*/
  
  
  router.get('/', passport.authenticate('google', { 
      scope: ['profile', 'email'] }
      ));
  
  router.get('/redirect', passport.authenticate('google'),
  (req, res) => {
    // Successful authentication, redirect home.
    console.log('redirect good');
    //res.send(req.user);
    res.redirect("http://localhost:4200/home")
});
  
  module.exports = router;