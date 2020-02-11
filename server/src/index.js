/* eslint-disable no-console */
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const dotenvExtended = require('dotenv-extended');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const logs = require('./api/logs');
const middleware = require('./middleware');

const app = express();

const config = dotenv.config({
  debug: process.env.DEBUG,
  path: '.env',
});
if (config.error) {
  throw config.error;
}

dotenvExtended.load({
  encoding: 'utf8',
  silent: true,
  path: '.env',
  defaults: '.env.defaults',
  schema: '.env.schema',
  errorOnMissing: true,
  errorOnExtra: true,
  errorOnRegex: true,
  includeProcessEnv: false,
  assignToProcessEnv: true,
  overrideProcessEnv: false,
});
dotenvExpand(config);


mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
  .then(() => {
    console.log('******************************');
    console.log('Database Connected!');
    console.log('******************************');
  })
  .catch((err) => {
    console.log('******************************');
    console.log('Database Error!\n', err);
    console.log('******************************');
  });

app.use(morgan('common'));
app.use(helmet());

const whitelist = ['http://localhost:2999', 'http://localhost:3000', 'http://192.168.0.100', undefined];
// same origin requests will have origin undefined, required if you want to hit api through browser!
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🚀',
  });
});

app.use('/api/logs', logs);

app.use(middleware.notFound);
app.use(middleware.errorHandler);

const port = process.env.PORT || 2999;
app.listen(port, () => {
  console.log('******************************');
  console.log(`Listening on port ${port}`);
  console.log('******************************');
});
