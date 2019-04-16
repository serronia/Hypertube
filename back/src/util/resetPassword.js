const express = require('express');
const router = express.Router();
const User = require('../model/User');

const mongoose = require('mongoose');
const database = process.env.C_MONGO;


mongoose.connect(database);

forgotPassword: function(req, res) {
    var generator = require('generate-password');
   let email = req.body.email;
   var pass = generator.generate({
       lenght: 8,
       numbers: true,
       symbols: true,
       uppercase: true
   });
   console.log("hello");
      if (!email) 
        {
            console.log("error");
            return res.status(400);
        }
  
      User.findOne({email: email}, (err, result) => {
          if (err) 
            return res.status(400);
          if (!result) {
              console.log("result ok");
            return res.status(200);
          }
          result.save(function(err) {
            
              if (err) {
                
                return res.status(400).json(err);
            }
              let transport = send_mail.createTransport({
                  service: 'gmail',
                  auth: {
                      user: 'hypertubeprojet@gmail.com',
                      pass: 'Hypertube-101'
                  }
              });
              let mailOption = {
                  from: 'Hypertube',
                  to: req.body.email,
                  subject: 'Hypertube - Reset Password',
                  text: 'Hello dear'+ req.body.username + 'To login again, please copy the following pasword and paste it when you log in\n Please update your password in your profil, once log in.\n' + pass
              };
              transport.sendMail(mailOption).then(info => {
                  console.log("mail sent")
                }).catch(err => {
                    console.log(err);
                });
              User.update({password: pass});
              
          });
  
      });
  }