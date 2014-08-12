var gpio = require("pi-gpio");
var http = require("http");

var flashes = 51;
var i = 0;
var state = 0;

var server = http.createServer(function(request, response) {
  
  if ( request.url === "/" ) {
  	response.writeHead(200, {"Content-Type": "text/html"});
  	response.write('<!DOCTYPE html><html><head><script src="http://code.jquery.com/jquery-1.11.1.min.js"></script><title>Franken-kitty</title></head><body><button id="trigger">Move that arm, kitty!</button><script>var button = document.getElementById("trigger");button.onclick = function(){$.get("/cat",function(){alert("I swang it!");});}</script></body></html>');
  	response.end();	
  } else if ( request.url === "/cat" ) {
  	response.writeHead(200, {"Content-Type": "text/html"});
  	response.write("Cat sent!");
  	response.end();	

  	gpio.open(7, "output", function(err) {
      
      var timer = setInterval(function(){
        
        if ( state === 0 ) {
          state = 1;
        } else {
          state = 0;
        }
      
        
        gpio.write(7, state, function() {
          i++;
          if ( i > flashes ) {
            clearInterval(timer);
            gpio.close(7);
            i = 0;
          }
        });
      }, 40);
		    
		});

  }


  


});
 
server.listen(8001);
console.log("Server is listening");


