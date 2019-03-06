const request = require('request');

const defaultAPI = 'https://www.metaweather.com/api/location/';

const getWoeId = coords => new Promise((resolve, reject) => {
  request.get(`${defaultAPI}search/?lattlong=${coords}`, (err, res) => {
    if (!err && res.statusCode === 200) {
      const search = JSON.parse(res.body);
      resolve(search[0].woeid);
    } else {
      reject(err);
    }
  });
});

const getWeatherSource = woeid => new Promise((resolve, reject) => {
  request.get(`${defaultAPI}search/location/${woeid}/`, (err, res) => {
    if (!err && res.statusCode === 200) {
      const source = JSON.parse(res.body);
      resolve(source);
    } else {
      reject(err);
    }
  });
});

module.exports = { getWoeId, getWeatherSource };
