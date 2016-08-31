var router = require('./router.js');
var http = require('http');
var url = require("url");
var chatServer = require('./lib/chat_server');

function start(port) {
	var server = http.createServer(function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		router.route(pathname, request, response);
	});

	server.listen(port, function() {
		console.log("Server start~!");
	});

	chatServer.listen(server);
}

exports.start = start;