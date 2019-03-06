const express = require('express');
const router = express.Router();

const { getBanks, getOneTerminal, getCityTerminals, getDistance, getRoute } = require('./money-exchange-repository/ParserRepository');

  // middleware that is specific to this router
  router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    console.log(req.params);
    next();
  });
  // banki.ru parser routing
  router.get('/terminal/:termId/', function (req, res) {
    getOneTerminal(req.params.termId).then(answer => {
      res.json(answer);
    });
  });
  router.get('/cityterms/:cityId/', function (req, res) {
    getCityTerminals(req.params.cityId).then(answer => {
      res.json(answer);
    });
  });
  router.get('/banks/:termId/', function (req, res) {
    getBanks(req.params.termId).then(answer => {
      res.json(answer);
    });
  });
  // MapBoxAPI routing
  router.get('/route/:termId/:destination', function (req, res) {
    getRoute(req.params.termId, req.params.destination).then(answer => {
      res.json(answer);
    });
  });
  router.get('/distance/:termId/:destination', function (req, res) {
    getDistance(req.params.termId, req.params.destination).then(answer => {
      res.json(answer);
    });
  });

module.exports = router;
