const express		      = require('express');
const router		      = express.Router();
const User            = require('../model/User');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const FORTYTWO_APP_ID = '669911811352-bdsbd20jmanch9e915t6ig1atn7c6lu2.apps.googleusercontent.com';
const FORTYTWO_APP_SECRET = 'CdYCIdfJZ32cP6COig1dcchm';

passport.use(new FortyTwoStrategy({
  clientID: FORTYTWO_APP_ID,
  clientSecret: FORTYTWO_APP_SECRET,
  callbackURL: "http://localhost:8080/auth/login/google/"
},