const express		      = require('express');
const router		      = express.Router();
const User            = require('../model/User');
const GithubStrategy  = require('passport-github');
const passport        = require('passport');
const	Jwthandle = require('../util/jwt.handeler.js');



const GITHUB_APP_ID = 'd47ae1de420e380f375e';
const GITHUB_APP_SECRET = 'b05fa8b220c66358f1021c23c1649a23939f6485';

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});


passport.use(new GithubStrategy({
  clientID: GITHUB_APP_ID,
  clientSecret: GITHUB_APP_SECRET,
  callbackURL: "http://localhost:8080/auth/github/redirect"
},
(accessToken, refreshToken, profile, done) => {
  var firstname = profile._json.first_name;
  var lastname = profile._json.last_name;
  var email = profile._json.email;

  
  console.log(profile);
  User.findOne({$or: [{username: profile._json.login},{email: profile._json.email }]}).then(currentUser => {

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
      return done(null, newUser);
      })
    }
  });
}
));


router.get('/', passport.authenticate('github'));

router.get('/redirect',
  passport.authenticate('github', { failureRedirect: 'http://localhost:4200/login' }),
  (req, res) => {
   req.body.username = req.user._doc.username;
   var Token = Jwthandle.sign(req, res);
   res.status(200).redirect('http://localhost:4200/login'+"?id="+req.user._doc._id+"&username="+req.user._doc.username+"&token="+Token);
    // Successful authentication, redirect home.
    //comments: utiliser router_user->if(bcrypt.compareSync(password, user_bdd.password)){}
//    res.send(res).redirect('http://localhost:4200/home');
});

module.exports = router;