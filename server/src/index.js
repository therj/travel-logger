/* eslint-disable no-console */
const dotenvExpand = require('dotenv-expand');
const dotenvSafe = require('dotenv-safe');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const logs = require('./api/logs');
const middleware = require('./middleware');

const app = express();

const envConfig = dotenvSafe.config({
  allowEmptyValues: true,
  example: '.env.example',
});

dotenvExpand(envConfig);

if (envConfig.error) {
  throw envConfig.error;
}

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

const whitelist = process.env.CORS_WHITELIST
  .split(',').map((x) => x.trim());
// eslint-disable-next-line eqeqeq
if (process.env.CORS_SELF == 1) { whitelist.push(undefined); }
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
app.use(middleware.modifyResponseBody);

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
