const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const apiRouter = require('./api/modules/routes-modules');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '50mb' }));

// апи роутер
app.use('/api', apiRouter);
app.use(({ req, res, next }) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.static(path.join(__dirname, 'front/aiomedia/toyota/')));

app.get('/aio_media/toyota_roll_up', (req, res) => {
  res.sendFile(path.join(__dirname, 'front/aiomedia/toyota', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'front/modules/')));

app.get('/module/money-exchange/', (req, res) => {
  res.sendFile(path.join(__dirname, 'front/modules/money-exchange', 'index.html'));
});

app.get('/module/yandex-weather/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'front/modules/yandex-weather', 'index.html'));
});

app.get('/', (req, res) => {
  res.send('test');
});

app.listen(port, '0.0.0.0', () => {
  console.info(`Open http://localhost:${port}/`); // eslint-disable-line no-console
});

module.exports = app;
