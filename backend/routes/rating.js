const router = require("express").Router();
let Rate = require("../models/Rating");

router.route("/add").post((req, res) => {
  const title_orig = req.body.title_orig;
  const customerEmail = req.body.customerEmail;
  const noOfRate = Number(req.body.noOfRate);

  const newRate = new Rate({
    title_orig,
    customerEmail,
    noOfRate,
  });

  newRate
    .save()
    .then(() => {
      res.json("Rate Added.");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  Rate.find()
    .then((rate) => {
      res.json(rate);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/get/:title_orig").get(async (req, res) => {
  let title_orig = req.params.title_orig;

  await Rate.find({ ItemName: title_orig })
    .then((rate) => {
      res.json(rate);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Opps! Error in loading the rates" });
    });
});

router
  .route("/getbyemailandtitle/:customerEmail/:title_orig")
  .get(async (req, res) => {
    const title_orig = req.params.title_orig;
    const customerEmail = req.params.customerEmail;

    await Rate.find({ customerEmail: customerEmail, title_orig: title_orig })
      .then((rate) => {
        res.json(rate);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Opps! Error in loading the rates" });
      });
  });

router.route("/update").put(async (req, res) => {
  const title_orig = req.body.title_orig;
  const customerEmail = req.body.customerEmail;
  const noOfRate = Number(req.body.noOfRate);

  const updateRate = {
    title_orig,
    customerEmail,
    noOfRate,
  };

  await Rate.findOneAndUpdate(
    { buyerEmail: customerEmail, itemName: title_orig },
    updateRate
  )
    .then(() => {
      res.status(200).send({ status: "Rate Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating the rate", error: err.message });
    });
});

module.exports = router;
