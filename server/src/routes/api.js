const express = require('express')

const planetsRouter = require('./planets/planets.router');
const launchesRouter = require('./launches/launches.routes');

const api = express.Router();

api.use('/launches', launchesRouter);
api.use('/planets', planetsRouter); 

module.exports = api;