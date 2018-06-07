const http = require('http');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('../src/routes');

const initSwagger = require('../src/middleware/swagger/initSwagger');
const initCookie = require('../src/middleware/cookie/initCookie');

const port = parseInt(process.env.PORT, 10) || 8000;
const app = express();

app.set('port', port);

const server = http.createServer(app);

server
  .listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
  })
  .on('error', (err) => {
    console.error(err);
  });


initSwagger(app);
initCookie(app);

app.use(logger('dev'));
app.use(bodyParser.json());

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({
  extended: true,
}));
routes(app);
