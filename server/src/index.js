const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

const app = express()
app.use(morgan('common'))
app.use(helmet())

const whitelist = ['http://localhost:2999', 'http://localhost:3000', 'http://192.168.0.100', undefined]
// same origin requests will have origin undefined, required if you want to hit api through browser!
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Blocked by CORS'))
    }
  },
}

app.use(cors(corsOptions))

app.get('/', (req, res) => {
  res.json({
    message: 'hello',
  })
})

// Not found
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
})

// Error handling

app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: error.message,
    error: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
  })
})

const port = process.env.PORT || 2999
app.listen(port, () => {
  console.log(`Listening on at ${process.env.HOST}: ${port}`)
})
