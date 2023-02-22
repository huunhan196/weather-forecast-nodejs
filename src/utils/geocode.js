const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiaHV1bmhhbjE5NiIsImEiOiJjbGVkcDZmd3kwOTVyNDFxYWZsYmZqMm1nIn0.jYSK6dple930UWPsGm4b7w&limit=1`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search.");
    } else {
      const [lng, lat] = response.body.features[0].center;
      const placeName = response.body.features[0]["place_name"];
      callback(undefined, {
        lat,
        lng,
        placeName,
      });
    }
  });
};

module.exports = geocode;
