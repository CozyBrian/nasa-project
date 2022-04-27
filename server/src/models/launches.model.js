const launches = new Map();

let latestFlightNumber = 100;

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

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(latestFlightNumber, Object.assign(launch, {
    flightNumber: latestFlightNumber,
    customer: ['Brian', 'Tesla'],
    upcoming: true,
    success: true
  }))
}


module.exports = {
  getAllLaunches,
  addNewLaunch
}
