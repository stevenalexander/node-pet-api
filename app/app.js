var express = require('express')
var logger = require('morgan')

var petsRoute = require('./routes/pets')

var app = express()

app.use(logger('dev'))

petsRoute(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  })
})

module.exports = app
