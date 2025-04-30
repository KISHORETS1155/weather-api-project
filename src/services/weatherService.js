require('dotenv').config(); // add this line

const axios = require('axios');

const getWeather = async (city) => {
    const weatherApiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch weather data: ${error.response ? error.response.status : error.message}`);
    }
};

module.exports = { getWeather };
