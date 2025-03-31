const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
    address
  )}&access_token=pk.eyJ1IjoiaGFwcHluZGlrdW1hbmEiLCJhIjoiY204aXVjeTlrMDRnMDJqcHRveGZ5andlMiJ9.s3iZTDtNpwHvDnWQDtqfnw&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      console.log(body.features.at(0).properties.full_address);
      callback(undefined, {
        latitude: body.features.at(0).geometry.coordinates.at(1),
        longitude: body.features.at(0).geometry.coordinates.at(0),
        location: body.features.at(0).properties.full_address,
      });
    }
  });
};

module.exports = geocode;
