const { getAllLaunches, addNewLaunch, existingLaunchwithId } = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpPostNewLaunch(req, res) {
  const launch = req.body;
  
  if (!launch.launchDate || !launch.target  || !launch.mission || !launch.rocket) {
    return res.status(400).json({
      error: "Missing required launch property"
    });
  }
  launch.launchDate = new Date(launch.launchDate)

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date"
    });
  }

  addNewLaunch(launch)
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchid = req.params.id;

  if (existingLaunchwithId(launchId)) {
    return res.status(404).json({
      error: "Launch could not be found!"
    });
  } 

  const aborted = abortLaunchByid(launchid);
  return res.status(200).json(aborted)
}

module.exports = {
  httpGetAllLaunches,
  httpPostNewLaunch,
  httpAbortLaunch
};
