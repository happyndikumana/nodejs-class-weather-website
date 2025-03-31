const request = require("request");

const forecast = (latitude, longitude, callback) => {
  // console.log(String(latitude) + ", " + String(longitude));
  /* Coordinates (Lat/Lon) */
  const url = `https://api.weatherstack.com/current?access_key=23fd0bee5f48b8232f678bd8e1b685c2&query=${String(
    latitude
  )},${String(longitude)}&units=f`;

  request({ url, json: true }, (error, { body } = {}) => {
    const currentTemp = body.current.temperature;
    const feelsLikeTemp = body.current.feelslike;
    const weatherDescription = body.current.weather_descriptions.at(0);
    const humidity = body.current.humidity;
    const windSpeed = body.current.wind_speed;

    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${weatherDescription}. It is currently ${currentTemp} degrees out. It feels like ${feelsLikeTemp} degrees out. The humidity is ${humidity}% with a windspeed of ${windSpeed}.`
      );
    }
  });
};

module.exports = forecast;
