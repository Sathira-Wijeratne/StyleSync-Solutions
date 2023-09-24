const router = require("express").Router();
let Rate = require("../models/Rating");

router.route("/getratings/:size").get(async (req, res) => {
  let size = req.params.size;

  await Rate.find({ size: size })
    .then((rate) => {
      res.json(rate);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Opps! Error in loading the rates" });
    });
});

module.exports = router;
