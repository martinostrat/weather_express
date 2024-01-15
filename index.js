const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const key = '';

let city = 'Tartu';

app.get('/', (req, res) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then(res => res.json())
        .then(data => {
            let city = data.name;
            let temp = Math.round(parseFloat(data.main.temp) - 273.15);
            let desc = data.weather[0].description;

            res.render('index', {
                city: city,
                temp: temp,
                desc: desc
            });
        })
})

app.listen(3001);