const express = require('express');
const app = express();
const session = require('express-session');
const port = process.env.P_BACK;
const http = require('http').Server(app);

const routes = require('./routes');

app.use('/', routes);

http.listen(port, function(){
		  console.log('server listening on port : ' + port);
});
