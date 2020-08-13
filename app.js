const express = require("express");
const https = require("https");
require("dotenv").config();


const app = express();
const port = 3000;

//res refers to app.get response
app.get("/", (req, res) => {
    const api_key = process.env.API_KEY;
    const url  = "https://api.openweathermap.org/data/2.5/weather?q=Brownsville,us&appid=" + api_key + "&units=metric";
    
    //response refers to https.get response
    https.get(url, (response) => {
        console.log(response.statusCode);
        //using ".on()"" method to get Api data and then parsing the code through JSON ".parse()"" method
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon;
            const imageURL =  "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p></p>The weather is currently " + description + "</p>");
            res.write("<h1>The temperature in Brownsville is " + temp + " degrees Celsius</h1>");
            res.write("<img src=" + imageURL + ">" );
            res.send();
        });
    });
});


app.listen(port, () => {
    console.log("App Started");
});