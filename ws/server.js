var net = require('net');
var action = require('./action');

var server = net.createServer(function(socket){

	socket.write('10');

	socket.on('data', function (data) {
		var raw = data.toString().trim();
		var pass = 0;

		switch(raw) {
			case "1":
				action.forward();
				pass = 1;
			break;
			case "12":
				action.stopForward();
				pass = 1;
			break;
		}

		if ( pass === 1 ) {
			socket.write('1');
		} else {
			socket.write('0');
		}

	});

}).listen(8080);