var requestHandlers = require("./requestHandlers.js");
var fs = require('fs');
var cache = {};

function route(pathname, request, response) {
	console.log("About to route a request for " + pathname);
	var filePath = false;
	if (request.url == '/') {
		filePath = 'public/index.html';
	} else {
		filePath = 'public' + request.url;
	}
	var absPath = './' + filePath;

	fs.exists(absPath, function(exists) {
		if (exists) {
			requestHandlers.chatroom(request, response, cache, absPath);
		} else {
			sendPageNotFound(response);
		}
	});
}

function sendPageNotFound(response) {
	response.writeHead(404, {
		'Content-Type': 'text/plain'
	});
	response.write('Error 404 : resource not found')
	response.end();
}

exports.route = route;