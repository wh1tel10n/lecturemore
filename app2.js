var express = require('express');
var app = express();
let request = require('request');
const argv = require('yargs').argv;
var fs = require("fs");
var ejs = require("ejs");
require('dotenv').config();

const apiKey = process.env.OPEN_API_KEY;
let city = argv.c || 'seoul';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`


app.set('view engine', 'ejs');

app.listen(3000, ()=>{
    console.log("Server is Starting")
})

app.get('/' , (req,res ) =>{
  request(url, function (err, response, body) {
    if(err){
      console.log('error:', error);
     
    } 

      let weather = JSON.parse(body)
      let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
      console.log(weather.weather)
      console.log(message);
      let result = {
        weather : weather.main,
        weatherMessage: message
      }
    

    

    fs.readFile('test1.html', "utf-8", (error , data)=>{
      if(error) {
        console.log("오류"+error);
        return;
      }

      res.send(
        ejs.render(data, {
          data : result,
          message : message
        })
      )
      console.log(result)
    })
  });
    
   
})

module.exports = app;