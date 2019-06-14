

var express = require("express");

var http = require("http");

var path = require("path");



var app = express();



app.use(express.static(path.join(__dirname, 'public')));





app.get("/Login", function(req, res){

	console.log("user login");

	

	var uId = req.param("uId");

	var uPw = req.param("uPw");

	

	res.writeHead("200", {"Content-Type":"text/html;charset=utf8"});

	res.write("user uId : " + uId);

	res.write("<br>");

	res.write("userd uPw : " + uPw);

			

	res.end();

});



http.createServer(app).listen(3000, function() {

	console.log("server start get!!!");

});

