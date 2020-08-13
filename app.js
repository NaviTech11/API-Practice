const express = require("express");
const https = require("https");
require("dotenv").config();
console.log(process.env);

const app = express();
const port = 3000;


app.get("/", (req, res) => {
    const api_key = process.env.API_KEY;
    const url  = "https://api.openweathermap.org/data/2.5/weather?q=Brownsville,us&appid=${api_key}&units=metric";
    
    https.get(url, (response) => {
        console.log(response);
    });
    
    res.send("Server Runnig")
});


app.listen(port, () => {
    console.log("App Started");
});