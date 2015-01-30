'use strict';
var weather = require('weatherjs').weather;
var net = require('net');

var HOST = "127.0.0.1";
var PORT = 6969;

var args = process.argv.slice(2);
var _latitude =  args[0] || 38.032024;
var _longitude = args[1] || -1.124372;

weather.init(_latitude, _longitude);

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

client.on('error', function(err) {
  console.log(err.stack)
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
