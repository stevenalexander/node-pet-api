# Node People API

[![BuildStatus](https://travis-ci.org/stevenalexander/node-pet-api.svg?branch=master)](https://travis-ci.org/stevenalexander/node-pet-api?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Simple [Express](https://expressjs.com/) RESTful API for pet reference data.

Using as part of testing various build/containerisation PoCs.

## Requires

* [Node](https://nodejs.org/en/)
* [Docker](https://www.docker.com/) (optional)

## Run

```
npm install

# available http://localhost:3002/pets returning a static JSON array ["CAT","DOG","FISH"]
npm start
```

## Test

```
npm test
```