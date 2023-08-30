const router = require("express").Router();
const spawn = require("child_process").spawn;

// Get prediction values
router.route("/getprediction").post((req, res) => {
  var userInputs = JSON.stringify(req.body);
  const pythonProcess = spawn("python", [
    "../python/baggingclassifier.py",
    userInputs,
  ]);
  pythonProcess.stdout.on("data", (data) => {
    res.send(data.toString());
  });
});

module.exports = router;
