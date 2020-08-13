const express = require("express");
const https = require("https");
require("dotenv").config();


const app = express();
const port = 3000;


app.get("/", (req, res) => {
    const api_key = process.env.API_KEY;
    const url  = "https://api.openweathermap.org/data/2.5/weather?q=Brownsville,us&appid=" + api_key + "&units=metric";
    
    https.get(url, (response) => {
        console.log(response.statusCode);
        //using ".on()"" method to get Api data and then parsing the code through JSON ".parse()"" method
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            // console.log(temp);
            const description = weatherData.weather[0].description
            console.log(description);
        });
    });
    
    res.send("Server Runnig")
});


app.listen(port, () => {
    console.log("App Started");
});