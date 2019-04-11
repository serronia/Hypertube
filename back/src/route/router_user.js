const express = require('express');
const router = express.Router();
const User = require('../model/User');
const passport = require('passport');
// const mail = require('./util/mail');
const LocalStrategy = require('passport-local');
const Check = require('../util/check');
const mongoose = require('mongoose');
const database = process.env.C_MONGO;
const bcrypt = require('bcrypt');

const	Jwthandle = require('../util/jwt.handeler.js');

mongoose.connect(database);

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

/**************************************************************/
router.get('/drop_user', (req, res) => {
	console.log("server hit /drop_user");
	  User.remove({}, function (err) {
    	if (err) { throw err; }
		   	 console.log('table user supprimée');
		res.status(200).json("all users deleted");
  });
});
/*************************************************************/

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
		var Token = Jwthandle.sign(req, res);
        res.status(200).json({
          id: user_bdd._id,
          username: username,
          token: Token
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
      if(password == verif)
      {
          let user = new User({
            lastname: lastname,
            firstname: firstname,
            username: username,
            email: mail,
            password : hash,
            picture : "/assets/default.png"
          });
          user.save(error => {
            if (error)
            {
              res.status(400).send("Format error, please re-read your input");
            }
            else
            {
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


router.post('/modify_info', (req, res) => {
  console.log("server hit /modify_info");
  var post_id = req.body.id;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var mail = req.body.mail;
  var language = req.body.language;

  User.findOneAndUpdate(
    {_id: post_id},
    {$set: {firstname: firstname, lastname: lastname, email: mail, language:language }},{returnNewDocument : true}, 
    function(err, doc){
      if(err){
          console.log("Something wrong when updating record!");
          res.status(400).send("Something wrong when updating record!");
      }
      else
      {
        console.log("ok user updated !! :)");
        res.status(201).json({message: 'User modified successfully'});
      }
  });
});

router.post('/modify_log', (req, res) => {
  console.log("server hit /modify_log");
  var post_id = req.body.id;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  console.log("post = ", req.body);
  let hash = bcrypt.hashSync(password, 10);
  if (password == password2)
  {
    User.findOneAndUpdate(
      {_id: post_id},
      {$set: {username: username, password: hash}},{returnNewDocument : true}, 
      function(err, doc){
        if(err){
            console.log("Something wrong when updating record!");
            res.status(400).send("Something wrong when updating!");
        }
        else
        {
          console.log("ok user updated !! :)");
          res.status(201).json({message: 'User modified successfully'});
        }
    });
  }
  else
  {
    res.status(400).send("Passwords must be identicals");
  }
});

router.post('/modify_avatar', (req, res) => {
  console.log("server hit /modify_avatar");
  var post_id = req.body.id;
  var path = req.body.path;
  console.log("post = ", req.body);
  User.findOneAndUpdate(
    {_id: post_id},
    {$set: {picture: path}},{returnNewDocument : true}, 
    function(err, doc){
      if(err){
          console.log("Something wrong when updating avatar!");
          res.status(400).send("Something wrong when updating avatar!");
      }
      else
      {
        console.log("ok avatar updated !! :)");
        res.status(201).json({message: 'avatar modified successfully'});
      }
  });
});


module.exports = router;
