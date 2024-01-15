const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const key = 'b05a100c6e6c27146f81ad75c338bae4';

let city = 'Tartu';

const getWeatherDataPromise = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(data => {
                let city = data.name;
                let temp = Math.round(parseFloat(data.main.temp) - 273.15);
                let desc = data.weather[0].description;

                let result = {
                    city: city,
                    temp: temp,
                    desc: desc
                }

                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })
}

app.all('/', (req, res) => {
    let city;

    if (req.method == 'GET') {
        city = 'Tartu';
    }

    if (req.method == 'POST') {
        city = req.body.cityname;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

    getWeatherDataPromise(url)
        .then(data => {
            res.render('index', data);
        })
})


app.listen(3001);