const launches = new Map();

const launch = {
  flightNumber: 1,
  mission: "",
  rocketType: "",
  launchDate: new Date('December 27, 2030'),
  destination: "",
  customer: "",
  isUpcoming: true,
  success: true
};

launches.set(launch.flightNumber, launch);


module.exports = {
  launches
}
