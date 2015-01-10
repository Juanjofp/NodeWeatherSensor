var weatherPromise = require('weatherjs').weatherPromise;

weatherPromise(38.032024, -1.124372).then(function(data){
  console.log("Promise ok", data);
}, function(error){
  console.log("Promise error", error);
});
