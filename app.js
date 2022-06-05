//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
   res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
    //console.log(req.body.cityName);
    //console.log("Post received");
    const query = req.body.cityName;
const apiKey = "a71b602278cf32bd9a14cc28c43bd0d1";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey+ "&units=" + unit ;

https.get(url, function(response){
   console.log(response.statusCode);
   response.on("data" , function(data){
       const weatherData = JSON.parse(data);
       // console.log(weatherData);
       const temp = weatherData.main.temp;
       const weatherDes = weatherData.weather[0].description;
       const icon = weatherData.weather[0].icon;
       const imageUrl = "https://api.openweathermap.org/img/wn/" + icon + "@2x.png";
       console.log(temp);
       console.log(weatherDes);
       res.write("<h1>The temperature of " + query + " is"  + temp + "</h1>");
       res.write("<h3>Weather description is " + weatherDes + "</h3>");
       res.write("<img src=" + imageUrl + ">");
       res.send();
   });
    
   });
//  res.send("server is up and running");

});




app.listen(3000, function(){
    console.log("server is running on port 3000");
});