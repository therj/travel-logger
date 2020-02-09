const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const middleware = require('./middleware');

const app = express();
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

app.get('/', (req, res) => {
  res.json({
    message: 'hello',
  });
});


app.use(middleware.notFound);
app.use(middleware.errorHandler);

const port = process.env.PORT || 2999;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info(`Listening on at ${process.env.HOST}: ${port}`);
});
