const express = require("express")
const server = express()
require('dotenv').config()
const axios = require('axios')
const bodyParser = require('body-parser');

server.set("view engine", "ejs")
server.use(express.static(__dirname + "/public"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

const URL = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&aqi=yes&q=`
// const BASE_URL = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=London&aqi=yes`

server.get("/", (req, res) => {

    axios.get(URL + `india`)
        .then(function (response) {
            res.render("home", {
                inputState: response.data.location.name,
                inputCountry: response.data.location.country,
                condIcon: response.data.current.condition.icon,
                condText: response.data.current.condition.text,
                temp_c: response.data.current.temp_c,
                co: response.data.current.air_quality.co,
                so2: response.data.current.air_quality.so2,
                pm2_5: response.data.current.air_quality.pm2_5,
                pm10: response.data.current.air_quality.pm10
            })
        })
        .catch(function (error) {
            console.log(error);
        })
})

server.post("/", (req, res) => {
    const state = req.body.state
    const country = req.body.country
    if (country === "" && state === "") {
        country = "india"
    }

    axios.get(URL + `${state}, ${country}`)
        .then(function (response) {
            res.render("home", {
                inputState: response.data.location.name,
                inputCountry: response.data.location.country,
                condIcon: response.data.current.condition.icon,
                condText: response.data.current.condition.text,
                temp_c: response.data.current.temp_c,
                co: response.data.current.air_quality.co,
                so2: response.data.current.air_quality.so2,
                pm2_5: response.data.current.air_quality.pm2_5,
                pm10: response.data.current.air_quality.pm10
            })
            console.log("-----------------------------------------------------------------------------------------------------------------");
        })
        .catch(function (error) {
            console.log(error);
        })



})
server.listen(4123)


