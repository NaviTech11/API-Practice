const express = require("express");
const https = require("https");

const app = express();
const port = 3000;


app.get("/", (req, res) => {
    
    https.get("https://api.openweathermap.org/data/2.5/weather?q=Brownsville,us&appid=50cd2b33f6bd5eba764b335cc0c943de&units=metric")
});


app.listen(port, () => {
    console.log("App Started");
});