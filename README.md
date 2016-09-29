# Node People API

[![BuildStatus](https://travis-ci.org/stevenalexander/node-people-api.svg?branch=master)](https://travis-ci.org/stevenalexander/node-people-api?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Simple [Express](https://expressjs.com/) RESTful API for People data.

Using as part of testing various build/containerisation PoCs.

## Requires

* [Node](https://nodejs.org/en/)
* [Docker](https://www.docker.com/) (optional)

## Run

```
npm install

# Set env for MySql database
# docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=people -p 3306:3306 -d mysql:latest
export DB_USERNAME='root'
export DB_PASSWORD='root'
export DB_SERVER='127.0.0.1'
export DB_DATABASE='people'

# Setup DB
node_modules/.bin/knex migrate:latest --env development

# available http://localhost:3001/people
npm start
```

### Run in container

```
# Spin up MySql and node-people-api containers
docker-compose up
```

## Test

```
npm test
```

## Notes

* used `npm shrinkwrap` to fix dependency versions
* added `wait-for-mysql.sh` script to poll mysql container using `knex migrate:currentVersion` before running migration scripts, avoiding the need to call migration scripts outside container
