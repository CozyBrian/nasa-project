const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 1,
  mission: "",
  rocket: "",
  launchDate: new Date('December 27, 2030'),
  destination: "",
  customer: "",
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
