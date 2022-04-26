const express = require("express");
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.routes');

const app = express();

app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(morgan('combined'))

app.use(express.json());
app.use(express.static(path.join(__dirname,"..","public")));

app.use(launchesRouter);
app.use(planetsRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"..","public"));
});

module.exports = app;
