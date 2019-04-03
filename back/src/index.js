var express = require('express');
var session = require('express-session');
var app = express();
var port = process.env.P_BACK;

var http = require('http').Server(app);

app.use('/', function(req, res) {
		console.log("server hitted");
});

http.listen(port, function(){
		  console.log('server listening on port : ' + port);
});

