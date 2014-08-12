var gpio = require("pi-gpio");
var currentAction = {
	forward: 0,
	backward: 0,
	left: 0,
	right: 0
}

var timers = {
	forward: 0,
	backward: 0,
	left: 0,
	right: 0
}

exports.forward = function() {

	console.log("Foward");

	gpio.open(7, "output", function(err) {

		gpio.write(7, 1, function(){});

	});

}

exports.stopForward = function() {

	console.log("Stop forward");

	gpio.write(7,0,function(){

		gpio.close(7);

	});

}