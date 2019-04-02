var express = require('express');
var session = require('express-session');
var app = express();
var port = process.env.SERVER_PORT;

var http = require('http').Server(app);

app.use('/', function(req, res) {
	console.log("server hit");
});

http.listen(port, function(){
	  console.log('server listening on port :' + port);
});
