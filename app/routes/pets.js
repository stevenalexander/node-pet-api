var express = require('express')

module.exports = function (app) {
  var route = express.Router()
  var PETS = ['CAT', 'DOG', 'FISH']

  app.use('/pets', route)

  route.get('/', function (req, res) {
    res.status(200).json(PETS)
  })

  route.get('/status', function (req, res) {
    res.json({'status': 'OK'})
  })
}
