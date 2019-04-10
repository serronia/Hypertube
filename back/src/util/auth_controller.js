const passport = require('passport');

exports.google = (req, res) => {
    passport.authenticate('google', { failureRedirect: '/' }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                message: 'Please check your Google credentials'
            });
        } else {
            const token = user.createJwtToken(user);
            const xsrfToken = token['xsrfToken'];
            res.cookie('accessToken', token['jwtToken'], { httpOnly: true });
            res.redirect('http://localhost:4200/home?xsrfToken=' + xsrfToken + '&userID=' + user._id)
        }
    })(req, res);
}

exports.fortytwo = (req, res) => {
    passport.authenticate('42', { failureRedirect: '/' }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                message: 'Please check your 42 credentials'
            });
        } else {
            console.log('been there')
            const token = user.createJwtToken(user);
            const xsrfToken = token['xsrfToken'];
            res.cookie('accessToken', token['jwtToken'], { httpOnly: true });
            res.redirect('http://localhost:4200/home?xsrfToken=' + xsrfToken + '&userID=' + user._id)
        }
    })(req, res);
}