const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b2b99116257b85090326bd93bcfbd01f&query=${lat},${long}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to forecast service...", undefined);
    } else if (body.error) {
      callback("Could not find location to relay forecast", undefined);
    } else {
      const realTemp = body.current.temperature;
      const feelsLike = body.current.feelslike;
      const forecast = body.current.weather_descriptions[0];
      callback(
        undefined,
        `The forescast is ${forecast}, and currently ${realTemp} degrees, while it currently feels like ${feelsLike} degrees.`
      );
    }
  });
};

module.exports = forecast;
