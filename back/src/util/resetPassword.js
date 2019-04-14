/*const send_mail = require('nodemailer');
const User = require('../model/User');
const	Jwthandle = require('../util/jwt.handeler.js');

var transport = send_mail.createTransport({
    service: 'gmail',
    auth: {
        user: settings.username,
        pass: settings.password
    }
})

function sendEMail(email, subject, message, html) {
    var mailOption = {
        from: $mail,
        to: email,
        subject: subject,
        text: message,
        html: html
    }
    transport.sendMail(mailOption);
}

module.exports =  sendEMail;


module.exports.forgotPassword = function(req, res) {
    if (!req.body.email) return res.status(400).json(err);

    User.findOne({email: req.body.email}, function(err, result){
        if (err) return res.status(400).json(err);
        if (!result) return res.status(200).json('ok');
        let Token = Jwthandle.sign(req.body.email).toString();
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
            let link = "http://localhost:4200/reset_password/" + Token;
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
};
