let request = require('request');
const argv = require('yargs').argv;

// let apiKey = 'c102169915d8fd1679940af87a06903a';
let apikey = '892c827472f732e84ff849ecbdb7fce6';
let city = argv.c || 'seoul';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body)
    let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
    console.log(weather.weather)
    console.log(message);
  }
});