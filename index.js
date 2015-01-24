var weather = require('weatherjs').weather;
var net = require('net');

var HOST = "sew.juanjofp.com";
var PORT = 6969;

weather.init(38.032024, -1.124372);

var client = new net.Socket();

client.on('data', function(data) {
  console.log('Server says: ' + data);
  weather.closeLoop();
  client.destroy();
});

client.on('close', function() {
  console.log('Server closed');
  client.destroy();
});

weather.on('data', function(data) {
  console.log("Event data", data);
  client.write(JSON.stringify(data));
});

weather.on('error', function(error) {
  console.log("Event error", error);
  console.log('Server closed');
  client.destroy();
});

weather.on('close', function() {
  console.log("API closed");
  console.log('Server closed');
  client.destroy();
});

client.connect(PORT, HOST, function connect() {
  console.log('Coneccted to ' + HOST + ':' + PORT);
  weather.startLoop(1000);
});
