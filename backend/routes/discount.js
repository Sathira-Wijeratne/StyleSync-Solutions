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

//DISPLAY ROUTE
router.route("/").get((req, res) => {
  Discount.find()
    .then((discounts) => {
      res.json(discounts);
    })
    .catch((err) => {
      console.log(err);
    });
});

//UPDATE ROUTE
router.route("/update/:id").put(async (req, res) => {
  let id = req.params.id;
  const {
    discountId,
    discountType,
    discountRate,
    discountProductName,
    discountDescription,
    discountStartDate,
    discountExpirationDate,
  } = req.body;

  const updateDiscount = {
    discountId,
    discountType,
    discountRate,
    discountProductName,
    discountDescription,
    discountStartDate,
    discountExpirationDate,
  };

  const update = await Discount.findByIdAndUpdate(id, updateDiscount);

  res.status(200).send({ status: "Discount Updated", discount: update });
});

//DELETE ROUTE
router.route("/delete/:id").delete(async (req, res) => {
  let id = req.params.id;

  await Discount.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({ status: "Discount deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error In Deleting Discount", error: err.message });
    });
});

//DETAILS OF 1 RECORD (ID)
router.route("/get/:id").get(async (req, res) => {
  let id = req.params.id;
  const discount = await Discount.findById(id)
    .then((discount) => {
      res.status(200).send({ status: "Discount Record Fetched", discount });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error InFetching Discount", error: err.message });
    });
});

//FETCHING DETAILS BASED ON DISCOUNT ID
router.route("/getDiscount/:discountId").get(async (req, res) => {
  let discountId = req.params.discountId;

  await Discount.findOne({ "Discount ID": `${itemCode}` })
    .then((discount) => {
      res.status(200).send({ status: "Discount  Details fetched", discount });
    })
    .catch((err) => {
      console.log(err.message);

      res.status(500).send({
        status: "Error In Fetching Discount Details",
        error: err.message,
      });
    });
});

//FETCHING DETAILS BASED ON PRODUCT NAME
router.route("/getDiscount/:productName").get(async (req, res) => {
  let productName = req.params.productName;
  await Discount.findOne({ "Product with discount": `${productName}` })
    .then((discount) => {
      res.status(200).send({ status: "Discount  Details fetched", discount });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error In Fetching Discount Details",
        error: err.message,
      });
    });
});

module.exports = router;
