const express = require('express');
const weatherService = require('./services/weatherService');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // ✅ This is what your fetch() POST needs

app.get('/', (req, res) => {
    res.render('index', { weather: null, error: null });
});

app.post('/weather', async (req, res) => {
    const city = req.body.city;
    try {
        const data = await weatherService.getWeather(city);

        const weather = {
            city,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            main: data.weather[0].main,
            temperature: (data.main.temp - 273.15).toFixed(1),
            feels_like: (data.main.feels_like - 273.15).toFixed(1),
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind: data.wind.speed,
            sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
            sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString()
        };

        res.json(weather); // ✅ Respond with JSON
    } catch (error) {
        res.json({ error: 'Failed to fetch weather data. Please try again.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
