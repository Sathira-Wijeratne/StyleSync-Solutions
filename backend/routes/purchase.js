const router = require("express").Router();
let Discount = require("../models/Discount");
let Purchase = require("../models/Purchase");

// Add new purchase
router.route("/add").post((req, res) => {
  const buyerEmail = req.body.buyerEmail;
  const purchaseDate = req.body.purchaseDate;
  const purchaseItems = req.body.purchaseItems;
  const purchaseTotal = req.body.purchaseTotal;

  const newPurchase = new Purchase({
    buyerEmail,
    purchaseDate,
    purchaseItems,
    purchaseTotal,
  });

  newPurchase
    .save()
    .then(() => {
      res.json("Purchase Added.");
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get all purchases of a buyer
router.route("/get/:buyerEmail").get(async (req, res) => {
  let buyerEmail = req.params.buyerEmail;

  const retrieve = await Purchase.find({ "buyerEmail": buyerEmail }).sort({ purchaseDate: -1 }).then((purchase) => {
    res.json(purchase);
  }).catch((err) => {
    res.status(500).send({ status: "Opps! Error in loading the purchases" });
  })
    .catch((err) => {
      res.status(500).send({ status: "Opps! Error in loading the purchases" });
    });
});

// Get purchase history of a specific product
router.route("/product-history/:productName").get(async (req, res) => {
  const productName = req.params.productName;

  const retrieve = await Purchase.find({
    "purchaseItems.productName": productName,
  })
    .then((purchases) => {
      res.json(purchases);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Oops! Error in loading the purchase history" });
    });
});

// Get total purchases of a specific product within a given month
router.route("/getDiscountReportData/:year/:month").get(async (req, res) => {
  const year = parseInt(req.params.year);
  const month = parseInt(req.params.month);

  const startDate = new Date(year, month - 1, 2);
  const endDate = new Date(year, month, 1);

  // try {
  //   // Use MongoDB aggregation to count the number of purchases of the specific product within the specified month
  //   const result = await Purchase.aggregate([
  //     {
  //       $match: {
  //         purchaseDate: {
  //           $gte: startDate,
  //           $lte: endDate,
  //         },
  //         // "purchaseItems.productName": productName,
  //       },
  //     },
  //     {
  //       $group: {
  //         _id: null,
  //         totalPurchases: { $sum: "$purchaseItems.quantity" }, // Sum the quantity for the specific product
  //       },
  //     },
  //   ]);

  //   if (result.length === 0) {
  //     // No purchases found for the given product and month
  //     return res.json({ totalPurchases: 0 });
  //   }

  //   // Return the total number of purchases of the specific product for the given month
  //   res.json({ totalPurchases: result[0].totalPurchases });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({
  //     error: "An error occurred while calculating the total purchases.",
  //   });
  // }

  try {
    const discountProductNamePipeline = [
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $year: "$discountStartDate" }, year] },
              { $eq: [{ $month: "$discountStartDate" }, month] },
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          distinctDiscounts: { $addToSet: "$discountProductName" },
        },
      },
    ];

    const distinctDiscounts = await Discount.aggregate(
      discountProductNamePipeline
    );

    const productNameFilter = {
      "purchaseItems.productName": {
        $in: distinctDiscounts[0].distinctDiscounts,
      },
    };

    const purchaseItemsPipeline = [
      { $match: productNameFilter },
      { $unwind: "$purchaseItems" },
      {
        $match: {
          "purchaseItems.productName": {
            $in: distinctDiscounts[0].distinctDiscounts,
          },
          $expr: {
            $and: [
              { $eq: [{ $year: "$purchaseDate" }, year] },
              { $eq: [{ $month: "$purchaseDate" }, month] },
            ],
          },
        },
      },
      {
        $group: {
          _id: "$purchaseItems.productName",
          totalQuantity: { $sum: "$purchaseItems.productQuantity" },
        },
      },
      {
        $lookup: {
          from: "discounts",
          localField: "_id",
          foreignField: "discountProductName",
          as: "discountData",
        },
      },
      {
        $unwind: "$discountData",
      },
      {
        $project: {
          _id: 1,
          totalQuantity: 1,
          discountId: "$discountData.discountId",
          discountRate: "$discountData.discountRate",
        },
      },
    ];

    const totalQuantities = await Purchase.aggregate(purchaseItemsPipeline);

    res.send(totalQuantities);
  } catch (e) {
    res.json([]);
  }
});

module.exports = router;
