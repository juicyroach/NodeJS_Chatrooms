var path = require('path');
var mime = require('mime');
var fs = require('fs');

function chatroom(request, response, cache, absPath) {
	console.log('chatroom process');
	if (cache[absPath]) {
		sendFile(response, absPath, cache[absPath]);
	} else {
		fs.readFile(absPath, function(err, data) {
			if (err) {
				sendPageNotFound(response);
			} else {
				cache[absPath] = data;
				sendFile(response, absPath, data);
			}
		});
	}
}

function sendFile(response, filePath, fileContents) {
	response.writeHead(200, {
		'Content-Type': mime.lookup(path.basename(filePath))
	});
	response.end(fileContents);
}

exports.chatroom = chatroom;