const request = require("postman-request");

const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=7a4949e45fc39a2a47198dc777f63d43&query=${lat},${lng}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { temperature, feelslike, weather_descriptions } =
        response.body.current;
      callback(undefined, {
        temperature,
        feelslike,
        weather_descriptions,
      });
    }
  });
};

module.exports = forecast;
