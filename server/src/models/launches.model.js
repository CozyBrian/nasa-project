const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Search and Rescue",
  rocket: "DeepFinder 200 II",
  launchDate: new Date('December 27, 2030'),
  target: "Kepler 433-b",
  customer: "Brian",
  upcoming: true,
  success: true
};

saveLaunch(launch);

function existingLaunchwithId(launchId) {
  return launches.has(launchId);
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

  return latestLaunch.flightNumber;
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    kepler_name: launch.target
  });

  if (!planet) {
    throw new Error('No matching planet found!');
  } 
}

async function addNewLaunch(launch) {
  const newFlightNumber = await getLatestFlightNumber();

  const newLaunch = Object.assign(launch, {
    flightNumber: newFlightNumber(),
    customer: ['Brian', 'Tesla'],
    upcoming: true,
    success: true
  });

  await saveLaunch(newLaunch);
}

function abortLaunchByid(launchId) {
  const aborted = launches.get(launchId);

  aborted.upcoming = false;
  aborted.success = false;

  return aborted;
}


module.exports = {
  getAllLaunches,
  addNewLaunch,
  existingLaunchwithId,
  abortLaunchByid
}
