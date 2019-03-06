const express = require('express');

const router = express.Router();

const moneyExchangeRouter = require('./money-exchange/routes');
const yandexWeatherRouter = require('./yandex-weather/routes');

router
  .use(({ req, res, next }) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    next();
  })
  .get('/', (res, req, next) => {
    req.send('Error connect | Make request to specific API');
  })
  .use('/modules/money-exchange', moneyExchangeRouter)
  .use('/modules/yandex-weather', yandexWeatherRouter);

module.exports = router;
