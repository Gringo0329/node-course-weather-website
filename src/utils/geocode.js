const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidmljdG9yLXNhbnRvcyIsImEiOiJjbDBjcmxyMGkwMHM1M2JzMzlmcjEzaW04In0.DXpj89Y0Iq1gKAfnO4n0Hg&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to geolocation services", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find specified location", undefined);
    } else {
      const longitude = body.features[0].center[0];
      const latitude = body.features[0].center[1];
      const location = body.features[0].place_name;

      callback(undefined, {
        longitude,
        latitude,
        location,
      });
    }
  });
};

module.exports = geocode;
