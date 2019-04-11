const express		      = require('express');
const router		      = express.Router();
const User            = require('../model/User');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const	Jwthandle = require('../util/jwt.handeler.js');
const bcrypt = require('bcrypt');
const Check = require('../util/check');

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

const saveToSession = (req, res) => {
	const payload = {
		_id: req.user._id,
		username: req.user.username
	};
	req.session.user = payload;

  console.log(payload);
	req.save((err) => {
    console.log('TOP');
    if (err) {
      console.log('TRTQTQTTQTDTD');
      throw err;
    }
    else {
      console.log('redirect');
    res.redirect('/');
    }
	});
};

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
  var Username = profile._json.given_name;
  
    User.findOne( { googleId: profile.id}).then((currentUser) => {
      if (currentUser) {
        console.log('user already exist');
        //router.post('/login');
        done(null, currentUser);
      } else {
    user = new User({
      "username": Username,
      "firstname": Firstname,
      "lastname": Lastname,
      "email": email,
      googleId: profile.id
    });
    //console.log("user = ", user);
    user.save(
      function(err) {
        if (err) console.error(err);
        return done(err, user);}
    ).then((user) => {
      //console.log('new user created' + newUser);
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

    req.body.username = req.user._doc.username;
    var Token = Jwthandle.sign(req, res);
    res.status(200).redirect('http://localhost:4200/home'+"?id="+req.user._doc._id+"&username="+req.user._doc.username+"&token="+Token);

    // Successful authentication, redirect home.
    //console.log('redirect good');
    //router.post('/user/login');
    /*const token = Jwthandle;
    res.redirect(`http://localhost:4200/home?token=${token}`);
    
          console.log('log home');
    //comments: utiliser router_user->if(bcrypt.compareSync(password, user_bdd.password)){}
    */
});
  
  module.exports = router;