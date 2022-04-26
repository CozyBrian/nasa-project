const express = require("express");
const { getAllLaunches } = require('./planets.controller');

const launchesRouter = express.Router();

launchesRouter.get('/launches', getAllLaunches );

module.exports = launchesRouter;