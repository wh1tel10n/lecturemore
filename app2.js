let express = require('express');
let app = express();
let request = require('request');
let argv = require('yargs').argv; //도스 입력창에서 임의로 입력해주기 위해.
let fs = require("fs");
let ejs = require("ejs");
  require('dotenv').config(); //개발자모드에서 환경설정 가려주는 것.

let apiKey = process.env.OPEN_API_KEY;
let city = argv.c || 'seoul';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;


  app.set('view engine', 'ejs'); //ejs엔진세팅
var port = 3000;
  app.listen(port, ()=>{ //3000 포트로 서버스타트
    console.log("Server is Starting 3000 port");
});

  app.get('/', (req, res) => { //받아와라
    request(url, (error, req, body) => {
      if(error) {
        console.log('error:' + error);     
      } 

        let weather = JSON.parse(body); //오브젝트로 파싱해서 받아와라
        let celcius = Math.ceil((weather.main.temp - 32) / 1.8);
        let message = `지금 ${weather.name}의 온도는 ${celcius}도 입니다!`;
        console.log(weather.weather);
        console.log(message);

        let result = { //오브젝트 프로퍼티 형식으로 지정
          weather : weather.main,
          weatherMessage: message
        };
    
    fs.readFile('test1.html', "utf-8", (error , data)=> {
      if(error) {
        console.log("오류" + error);
        return;
      }

      res.send (
        ejs.render(data, {
          data : result,
          message : message
        })
      );
      console.log(result);
    });
  });
});

module.exports = app;