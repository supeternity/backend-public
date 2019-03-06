const express = require('express');

const router = express.Router();

const { geoCoordHandler } = require('./yandex-weather-repository/YWRlib');

const routerErrors = {
  emptyArgs: {
    parent: 'module router',
    module: 'yandex-weather',
    status: 'fail',
    description: 'check arguments',
  },
  crashProcessing: {
    parent: 'module router',
    module: 'yandex-weather',
    status: 'fail',
    description: null,
  },
};

router
  .get('/', (req, res) => {
    res.json(routerErrors.emptyArgs);
  })
  .get('/:coords/', (req, res) => {
    geoCoordHandler(req.params.coords).then((weatherObject) => {
      res.json(weatherObject);
    }).catch((err) => {
      routerErrors.crashProcessing.description = err;
      res.json(routerErrors.crashProcessing);
    });
  });

module.exports = router;
