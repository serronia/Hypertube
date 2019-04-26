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

const Jwthandle = require('../util/jwt.handeler.js');
const fs = require('fs');
const jwt = require('jsonwebtoken');

var privateKEY = fs.readFileSync('./src/util/jwt.private.key', 'utf8');

const send_mail = require('nodemailer');

mongoose.connect(database);

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({username: username, verified: true}, function (err, user) {
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
    User.remove({}, function (err) {
        if (err) {
            throw err;
        }
        res.status(200).json("all users deleted");
    });
});
/*************************************************************/

router.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    Check.getPassw(username)
        .then(
            user => {
                const user_bdd = user.data._doc;
                if (bcrypt.compareSync(password, user_bdd.password)) {
                    var Token = Jwthandle.sign(req, res);
                    res.status(200).json({
                        id: user_bdd._id,
                        username: username,
                        token: Token
                    });
                } else {
                    res.status(400).send('Username or password is incorrect');
                }
            }).catch(err => {
        res.status(400).send('User don\'t exist');
    })
});


router.post('/token', (req, res) => {
    var verif_opt = {
        issuer: "back",
        subject: "back",
        audience: req.body.username
    };
    jwt.verify(req.body.token, privateKEY, verif_opt, function (err, decoded) {
        if (err)
            res.status(401).json("Token Invalid or Expired");
        Check.getPassw(req.body.username)
            .then(
                user => {
                    const user_bdd = user.data._doc;
                    res.status(200).json({
                        id: user_bdd._id,
                        username: req.body.username,
                        token: req.body.token
                    });
                })
    });
});

router.post('/create', (req, res) => {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var mail = req.body.mail;
  var username = req.body.username;
  var password = req.body.password;
  var verif = req.body.password2;
  var avatar = req.body.avatar;
   
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
            picture : avatar
          });
          user.save(error => {
            if (error)
            {
              res.status(400).send("Format error, please re-read your input");
            }
        
            }).catch(err => {
                if (err)
                    res.status(400).send("Username or mail already exist");
                });
        }
    }
    });
});


router.post('/modify_info', (req, res) => {
    console.log("server hit /modify_info");
    var post_id = req.body.id;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var mail = req.body.mail;
    var language = req.body.language;
    var oldmail = req.body.oldmail;

    if (mail == oldmail) {
        User.findOneAndUpdate(
            {_id: post_id},
            {
                $set: {
                    firstname: firstname,
                    lastname: lastname,
                    email: mail,
                    language: language
                }
            }, {returnNewDocument: true},
            function (err, doc) {
                if (err) {
                    console.log("Something wrong when updating record!");
                    res.status(400).send("Something wrong when updating record!");
                } else {
                    console.log("ok user updated !! :)");
                    res.status(201).json({message: 'User modified successfully'});
                }
            });
    } else {
        Check.checkUserExists("", mail).then(resp => {
            if (resp) {
                User.findOneAndUpdate(
                    {_id: post_id},
                    {
                        $set: {
                            firstname: firstname,
                            lastname: lastname,
                            email: mail,
                            language: language
                        }
                    }, {returnNewDocument: true},
                    function (err, doc) {
                        if (err) {
                            console.log("Something wrong when updating record!");
                            res.status(400).send("Something wrong when updating record!");
                        } else {
                            console.log("ok user updated !! :)");
                            res.status(201).json({message: 'User modified successfully'});
                        }
                    });
            }
        }).catch(err => {
            if (err)
                res.status(400).send("Mail already exist");
        });
    }
});

router.post('/modify_log', (req, res) => {
  console.log("server hit /modify_log");
  var post_id = req.body.id;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  var oldusername =req.body.oldusername;
  let hash = bcrypt.hashSync(password, 10);
  if(username == oldusername)
  {
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
  }
});

router.post('/modify_avatar', (req, res) => {
  console.log("server hit /modify_avatar");
  var post_id = req.body.id;
  var path = req.body.path;
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

/******************Reset Password */
router.post('/forgotPassword', (req, res) => {
    var generator = require('generate-password');
    let email = req.body.mail;
    var pass = generator.generate({
        lenght: 8,
        numbers: true,
        symbols: true,
        uppercase: true,
        strict: true,
        lowercase: true

    });
    console.log("req.body =", req.body);
    if (!email) {
        console.log("error");
        return res.status(400).send('Email not found, please verify');
    }
    let hash = bcrypt.hashSync(pass, 10);
    User.findOneAndUpdate(
        {email: email},
        {$set: {password: hash}}, {returnNewDocument: true},
        function (err, doc) {
            if (!doc) {
                console.log("Email don't exist please verify");
                res.status(400).send("Email don't exist please verify");
            } else {
                let transport = send_mail.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'hypertubeprojet@gmail.com',
                        pass: 'Hypertube-101'
                    }
                });
                let mailOption = {
                    from: 'Hypertube',
                    to: email,
                    subject: 'Hypertube - Reset Password',
                    text: 'Hello dear user,\nTo login again, please copy the following pasword and paste it when you log in.\nPlease update your password in your profil, once log in.\nTemporary password :   ' + pass
                };
                transport.sendMail(mailOption).then(info => {
                    console.log("mail sent")
                }).catch(err => {
                    console.log(err);
                });
                console.log("OK pass updated !! :)");
                res.status(201).json({message: 'OK pass updated !! :)'});
            }
        });
});


module.exports = router;
