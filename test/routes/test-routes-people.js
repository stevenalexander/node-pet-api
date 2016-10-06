/* global describe beforeEach afterEach it */
var proxyquire = require('proxyquire')
var sinon = require('sinon')
var supertest = require('supertest')
var expect = require('chai').expect
var express = require('express')
var bodyParser = require('body-parser')
var person = require('../../app/model/person')

require('sinon-bluebird')

describe('index', function () {
  var request
  var sandbox
  var stubPersonValidator

  beforeEach(function () {
    sandbox = sinon.sandbox.create()

    var app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    stubPersonValidator = sinon.stub()
    if (person.add.restore) person.add.restore()

    var route = proxyquire('../../app/routes/people', {
      '../model/person': person,
      '../validators/person-validator': stubPersonValidator
    })

    route(app)

    request = supertest(app)
  })
  afterEach(function () {
    sandbox.restore()
  })

  describe('GET /people', function () {
    it('should respond with a 200 and return people', function (done) {
      var people = {people: [{name: 'Adam'}]}
      var stubGetAll = sinon.stub(person, 'getAll').resolves(people)

      request
        .get('/people')
        .expect(200)
        .end(function (error, response) {
          expect(error).to.be.null
          expect(stubGetAll.calledOnce).to.be.true
          expect(response.text).to.equal(JSON.stringify(people))
          done()
        })
    })
  })

  describe('POST /people', function () {
    it('should respond with a 201 and return item when valid', function (done) {
      stubPersonValidator.returns(false)
      var newPerson = {id: 1, name: 'Brian'}
      var stubAdd = sinon.stub(person, 'add').resolves(newPerson)

      request
        .post('/people')
        .type('json')
        .send(JSON.stringify(person))
        .expect(201)
        .end(function (error, response) {
          expect(error).to.be.null
          expect(stubPersonValidator.calledOnce).to.be.true
          expect(stubAdd.calledOnce).to.be.true
          expect(response.text).to.equal(JSON.stringify(newPerson))
          done()
        })
    })

    it('should respond with a 400 and return item when invalid', function (done) {
      var errorMessage = 'Error!'
      stubPersonValidator.returns([errorMessage])
      var stubAdd = sinon.stub(person, 'add').resolves({})

      request
        .post('/people')
        .type('json')
        .send(JSON.stringify(person))
        .expect(400)
        .end(function (error, response) {
          expect(error).to.be.null
          expect(stubPersonValidator.calledOnce).to.be.true
          expect(stubAdd.calledOnce).to.be.false
          expect(response.text).to.contain(errorMessage)
          done()
        })
    })
  })

  describe('DELETE /people/1234', function () {
    it('should respond with a 204', function (done) {
      var stubDel = sinon.stub(person, 'del').resolves()

      request
        .delete('/people/1234')
        .expect(204)
        .end(function (error, response) {
          expect(error).to.be.null
          expect(stubDel.calledOnce).to.be.true
          done()
        })
    })
  })
})
