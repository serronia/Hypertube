const express = require('express');
const app = express();
const session = require('express-session');
const port = process.env.P_BACK;
const http = require('http').Server(app);
const passport = require('passport');


const routes = require('./routes');
const IntraRoute = require('./util/42Oauth');
const userRoute = require('./router_user');

const url = 'mongodb://localhost:27017/Hypertube';

app.use('/', routes);
app.use('/user/', userRoute);
app.use('/auth/42/', IntraRoute);

http.listen(port, function(){
		  console.log('server listening on port : ' + port);
});

module.exports = app;