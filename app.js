const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require("dotenv").config();


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

//res refers to app.get response
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");

});

app.post("/", (req, res) => {
    console.log(req.body.cityName);
    const city = req.body.cityName;
    const country = "us";
    const apiKey = process.env.API_KEY;
    const unit = "metric";
    const url  = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&appid=" + apiKey + "&units=" + unit;

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
            res.write("<h1>The temperature in " + city + " is " + temp + " degrees Celsius</h1>");
            res.write("<img src=" + imageURL + ">" );
            res.send();
        });
    });
});




app.listen(port, () => {
    console.log("App Started");
});