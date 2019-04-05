const express = require('express');
const app = express();
const session = require('express-session');
const port = process.env.P_BACK;
const http = require('http').Server(app);
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');



const routes = require('./route/routes');
const IntraRoute = require('./util/42Oauth');
const userRoute = require('./route/router_user');

const url = 'mongodb://localhost:27017/Hypertube';

app.use('/', routes);
app.use('/user/', userRoute);
app.use('/auth/42/', IntraRoute);

app.post('*', function(req, res, next) {
	res.send('what??', 404);
});

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {});

app.use(cors({origin: ["http://localhost:8080"], credentials: true}));
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
	res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept ");
	res.setHeader("Access-Control-Allow-Method", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
})

http.listen(port, function(){
		  console.log('server listening on port : ' + port);
});

module.exports = app;