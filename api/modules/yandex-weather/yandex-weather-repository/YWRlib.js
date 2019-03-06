const { getWoeId, getWeatherSource } = require('./APIlib');

const geoCoordHandler = coords => new Promise((resolve, reject) => {
  if (coords) {
    const weatherObject = {};

    getWoeId(coords).then((woeid) => {
      getWeatherSource(woeid).then((source) => {
        weatherObject.local = source.parent.title;
        weatherObject.city = source.title;
        weatherObject.createdStamp = Date.now();
        weatherObject.consolidated = [];
        source.consolidated_weather.map((day) => {
          const dayHandler = {
            weatherStateName: day.weather_state_name,
            weatherStateAbbr: day.weather_state_abbr,
            date: day.applicable_date,
            minTempCentigrade: Math.round(day.min_temp),
            maxTempCentigrade: Math.round(day.max_temp),
            middleTempCentigrade: Math.round((day.min_temp + day.max_temp) / 2),
            windCompass: day.wind_direction_compass,
            windSpeedMps: Math.round((day.wind_speed / 0.62137) / 3.6),
            windDirection: day.wind_direction,
          };
          weatherObject.consolidated.push(dayHandler);
        });
        resolve(weatherObject); // module API answer
      }).catch((err) => {
        const error = `getWeatherSource error ${err}`;
        reject(error);
      });
    }).catch((err) => {
      const error = `getWoeId error ${err}`;
      reject(error);
    });
  } else {
    const error = 'geoCoordHandler require lat,lon coords for process';
    reject(error);
  }
});

module.exports = { geoCoordHandler };
