var Twitter = require('twitter');
var sadecScripts = require('./sadec_scripts.json');
var ping = require('ping');

// Load the http module to create an http server.
var http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(process.env.PORT || 8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");

var client = new Twitter({
  consumer_key: 'yQLXZwiw7PbyNSGngurCm0qEl',
  consumer_secret: 'N536pGn6NWbbM20e0ygLqltXagZezceV89TlpIAFzPao6our9h',
  access_token_key: '4598683515-6qTUB89PPjHlQOAn0ZTH2K2jQYSWBfc3YP7pPqP',
  access_token_secret: 'ImDWPfGIUxaO7YKriJj3vnLPmiLCUVR6AxpUOJP2F2PVH',
});

setInterval(postSadecQuote, 3600000);
setInterval(pingMySite, 5000)

function pingMySite() {
  var hosts = ['https://stormy-scrubland-6525.herokuapp.com/'];
  hosts.forEach(function(host){
      ping.sys.probe(host, function(isAlive){
          console.log("Hello from the otherside");
      });
  });
}

function postSadecQuote() {
    try {
        var x = Math.floor(Math.random() * 8);
	q = sadecScripts[x];
	console.log(q);
        client.post('statuses/update', {status: q},  function(error, tweet, response){
            if(error) throw error;
        });
    }
    catch(ex) {
        console.log(ex);
    }
} 

