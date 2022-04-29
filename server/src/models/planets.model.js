const parse = require("csv-parser");
const fs = require("fs");
const path = require("path");

const planets = require('./planets.mongo');


function loadPlanetsData() { 
  function isHabitable(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
      && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
      && planet['koi_prad'] < 1.6; 
  }
  
  return new Promise((resolve,reject) => {
    fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data2.csv'))
      .pipe(parse())
      .on('data', async (data) => {
        if (isHabitable(data)) {
          savePlanet(data);
        }
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', async () => {
        const planetCount = (await getAllPlanets()).length;
        console.log(`${planetCount} habitable planets found`);
        resolve();
      });
  }) 
}

async function getAllPlanets() {
  return await planets.find({}, {'__v': 0 , '_id' : 0});
}

async function savePlanet(planet) {
  try {
    await planets.updateOne({
      kepler_name: planet.kepler_name
    }, {
      kepler_name: planet.kepler_name
    }, {
      upsert: true
    });
  } catch (err) {
    console.error(`We could not get planets: ${err}`);
  }
}


module.exports = {
  loadPlanetsData,
  getAllPlanets
};