const parse = require("csv-parser");
const fs = require("fs");
const path = require("path");

const habitablePlanets = [];

function loadPlanetsData() { 
  function isHabitable(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
      && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
      && planet['koi_prad'] < 1.6; 
  }
  
  return new Promise((resolve,reject) => {
    fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data2.csv'))
      .pipe(parse())
      .on('data', (data) => {
        if (isHabitable(data)) {
          habitablePlanets.push(data); 
        }
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', () => {
        console.log(`${habitablePlanets.length} habitable planets found`);
        resolve();
      });
  }) 
}

function getAllPlanets() {
  return habitablePlanets;
}


module.exports = {
  loadPlanetsData,
  getAllPlanets
};