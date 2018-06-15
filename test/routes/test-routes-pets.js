/* eslint no-unused-expressions: 0 */
/* global describe beforeEach it */
var supertest = require('supertest')
var expect = require('chai').expect
var express = require('express')
var petsRoute = require('../../app/routes/pets')

describe('index', () => {
  var request

  beforeEach(() => {
    var app = express()

    petsRoute(app)

    request = supertest(app)
  })

  describe('GET /pets', () => {
    it('should respond with a 200 and return pets', () => {
      var PETS = ['CAT', 'DOG', 'FISH']

      return request
        .get('/pets')
        .expect(200)
        .then(function (response) {
          expect(response.text).to.equal(JSON.stringify(PETS))
        })
    })
  })
})
