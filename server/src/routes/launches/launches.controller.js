const { 
  getAllLaunches,
  addNewLaunch, 
  existingLaunchwithId, 
  abortLaunchByid 
} = require('../../models/launches.model');

const { getPagination } = require('../../services/query');

async function httpGetAllLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  const launches = await getAllLaunches(skip, limit)
  return res.status(200).json(launches);
}

async function httpPostNewLaunch(req, res) {
  const launch = req.body;
  
  if (!launch.launchDate || !launch.target || !launch.mission || !launch.rocket) {
    console.log(launch);
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

  await addNewLaunch(launch)
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  const exists = await existingLaunchwithId(launchId);

  if (!exists) {
    return res.status(404).json({
      error: "Launch could not be found!"
    });
  } 

  const aborted = await abortLaunchByid(launchId);

  if (!aborted) {
    return res.status(400).json({
      error: "Launch not aborted!"
    })
  }
  return res.status(200).json({
    ok: true
  })
}

module.exports = {
  httpGetAllLaunches,
  httpPostNewLaunch,
  httpAbortLaunch
};
