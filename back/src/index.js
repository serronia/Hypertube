const express = require('express');
const app = express();
//const session = require('express-session');
const expressValidator = require('express-validator');
const port = process.env.P_BACK;
const http = require('http').Server(app);
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');



const routes = require('./route/routes');
const IntraRoute = require('./util/42Oauth');
const GoogleRoute = require('./util/Googleauth');
const GithubRoute = require('./util/GitOauth');
const userRoute = require('./route/router_user');
const filmRoute = require('./route/router_film');
//const downloadRoute = require('./download');

//const torrentRoute = require('./route/router-torrent');


const url = 'mongodb://localhost:27017/Hypertube';

const cookieSession = require('cookie-session');

app.use(cookieSession({
	maxAge: 24 * 60 *60 *1000,
	keys: ['jsfkjsdbfksdb']
}));

app.use(expressValidator());
app.use(cors());

mongoose.set('useCreateIndex', true)
mongoose.connect(url, { useNewUrlParser: true }).then(() => {
  console.log("Database connected")
}).catch(err => {
  console.error("Connecting to error =>" + err);
})

/**initialize passport */
app.use(passport.initialize());
app.use(passport.session());


app.use('/', routes);
app.use('/user/', userRoute);
app.use('/film/', filmRoute);
app.use('/auth/42/', IntraRoute);
app.use('/auth/google/', GoogleRoute);
app.use('/auth/github/', GithubRoute);
//app.use('/download', downloadRoute);

/*app.post('*', function(req, res, next) {
	res.send('what??', 404);
});*/



passport.deserializeUser(function(id, done) {});

/**parti Torrent */

app.use('/', express.static('public'));

//app.use('/torrent/', torrentRoute);


http.listen(port, function(){
	console.log('server listening on port : ' + port);
});

module.exports = app;
