const fs   = require('fs');
const jwt   = require('jsonwebtoken');
const send_mail = require('nodemailer');
const User = require('../model/User');

var privateKEY  = fs.readFileSync('./src/util/jwt.private.key', 'utf8');

module.exports = {
 sign: function (req, res){

 var sign_opt = {
    issuer: "back",
    subject: "back", 
    audience: req.body.username
   };
  return jwt.sign({}, privateKEY, sign_opt);
},

verify: function (req,res, next){
	var token = req.headers["authorization"];
 	  var verif_opt = {
      issuer: "back",
      subject: "back",
      audience: req.query.username
    };
	jwt.verify(token, privateKEY, verif_opt, function(err, decoded) {
	if (err)
		res.status(401).json("Token Invalid or Expired");
	else
		next();
	});
   },
   
forgotPassword: function(req, res) {
   let email = req.body.email;
      if (!email) return res.status(400).json(err);
  
      User.findOne({email: email}, function(err, result){
          if (err) return res.status(400).json(err);
          if (!result) return res.status(200).json('ok');
          let Token = jwt.sign(email).toString();
          result.Token = Token;
          result.save(function(err) {
              if (err) return res.status(400).json(err);
              let transport = send_mail.createTransport({
                  service: 'gmail',
                  auth: {
                      user: 'hypertubeprojet101@gmail.com',
                      pass: 'Hypertube-101'
                  }
              });
              let link = "http://localhost:4200/reset_password/:email" + Token;
              let mailOption = {
                  from: 'Hypertube',
                  to: req.body.email,
                  subject: 'Hypertube - Reset Password',
                  text: 'To reset your password, please click the following link or copy/paste it to your browser' + link
              };
              transport.sendMail(mailOption, (error, info) => {
                  if (error) return res.status(400).json(err);
                  console.log('Email sent: ' + info.response);
                  return res.status(200).json('ok');
              });
          });
  
      });
  }
}
