const weatherService = require('./services/weatherService');
require('dotenv').config();

async function main() {
    const city = 'new york';
    try {
        const weather = await weatherService.getWeather(city);
        console.log(`Weather in ${city}:`);
        console.log(`Description: ${weather.weather[0].description}`);
        console.log(`Temperature: ${(weather.main.temp - 273.15).toFixed(2)} °C`);
        console.log(`Humidity: ${weather.main.humidity}%`);
        console.log(`Wind Speed: ${weather.wind.speed} m/s`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

main();
