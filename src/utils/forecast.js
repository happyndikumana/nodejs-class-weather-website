const request = require("request");

const forecast = (latitude, longitude, callback) => {
  // console.log(String(latitude) + ", " + String(longitude));
  /* Coordinates (Lat/Lon) */
  /* Ran out of monthly API calls
  // const url1 = `https://api.weatherstack.com/current?access_key=23fd0bee5f48b8232f678bd8e1b685c2&query=${String(
  //   latitude
  // )},${String(longitude)}&units=f`;
  */
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily&appid=2a5d19513bce751aad7d8bf6a0481910&units=imperial`;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Error: " + body.error.info, undefined);
    } else {
      const currentTemp = body.current.temp;
      const feelsLikeTemp = body.current.feels_like;
      const weatherDescription = body.current.weather.at(0).description;
      const humidity = body.current.humidity;
      const windSpeed = body.current.wind_speed;
      callback(
        undefined,
        `${weatherDescription}. It is currently ${currentTemp} degrees out. It feels like ${feelsLikeTemp} degrees out. The humidity is ${humidity}% with a windspeed of ${windSpeed} mph.`
      );
    }
  });
};

module.exports = forecast;
