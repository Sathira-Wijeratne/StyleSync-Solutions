const router = require("express").Router();

let Discount = require("../models/Discount");

router.route("/add").post((req, res) => {
  const discountId = req.body.discountId;
  const discountType = req.body.discountType;
  const discountRate = Number(req.body.discountRate);
  const discountProductName = req.body.discountProductName;
  const discountDescription = req.body.discountDescription;
  const discountStartDate = req.body.discountStartDate;
  const discountExpirationDate = req.body.discountStartDate;

  const newDiscount = new Discount({
    discountId,
    discountType,
    discountRate,
    discountProductName,
    discountDescription,
    discountStartDate,
    discountExpirationDate,
  });
  newDiscount
    .save()
    .then(() => {
      res.json("Discount added for product successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
