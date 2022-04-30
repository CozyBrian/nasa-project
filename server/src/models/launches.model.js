const axios = require('axios');

const launches = require('./launches.mongo');
const { populate } = require('./planets.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 0;

const launch = {
  flightNumber: 0,
  mission: "Search and Rescue",
  rocket: "DeepFinder 200 II",
  launchDate: new Date(' December 27, 2030'),
  target: "Kepler-442 b",
  customers: ["Brian"],
  upcoming: true,
  success: true
};

saveLaunch(launch);

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function findLaunch(filter) {
  return await launches.findOne(filter);
}

async function populateDBLaunches() {
  console.log("Downloading launch data");
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [{
        path: "rocket",
        select: {
          name: 1
        }
      },{
        path: "payloads",
        select:{
          customers: 1
        } 
      }]
    }
  });

  if (response.status !== 200) {
    console.log("Problem downloading Launch data!");
    throw new Error("Launch Data Download failed")
  }

  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    })

    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      customers ,
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"]
    }

    console.log(`${launch.flightNumber} ${launch.mission}`);
    await saveLaunch(launch);
  }
}

async function loadLaunchesData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat"
  });

  if (firstLaunch) {
    console.log("Launch data already exists");
  } else {
    await populateDBLaunches();  
  }
}


async function existingLaunchwithId(launchId) {
  return await launches.findOne({
    flightNumber: launchId
  });
}

async function getAllLaunches() {
  return await launches.find({}, {'_id': 0, '__v': 0});
}

async function getLatestFlightNumber() {
  const latestLaunch = await launches
    .findOne({})
    .sort('-flightNumber');

    if (!latestLaunch) {
      return DEFAULT_FLIGHT_NUMBER;
    }

  return latestLaunch.flightNumber + 1;
}

async function saveLaunch(launch) {
await launches.findOneAndUpdate({
    flightNumber: launch.flightNumber
  }, launch, {
    upsert: true
  }); 
}

async function addNewLaunch(launch) {
  const planet = await planets.findOne({
    kepler_name: launch.target
  });

  if (!planet) {
    throw new Error('No matching planet found!');
  }

  const newFlightNumber = await getLatestFlightNumber();

  const newLaunch = Object.assign(launch, {
    flightNumber: newFlightNumber,
    customers: "Brian",
    upcoming: true,
    success: true
  });

  await saveLaunch(newLaunch);
}

async function abortLaunchByid(launchId) {
  const aborted = await launches.updateOne ({
    flightNumber: launchId
  }, {
    upcoming: false,
    success: false,
  });

  return aborted.modifiedCount === 1 && aborted.acknowledged;
}



module.exports = {
  loadLaunchesData,
  getAllLaunches,
  addNewLaunch,
  existingLaunchwithId,
  abortLaunchByid
}
