const send_mail = require('nodemailer');

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

module.exports = {
    sendMail: sendEMail
};
