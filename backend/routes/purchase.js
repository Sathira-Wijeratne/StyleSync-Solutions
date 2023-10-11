const router = require("express").Router();
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

  const retrieve = await Purchase.find({ buyerEmail: buyerEmail })
    .then((purchase) => {
      res.json(purchase);
    })
    .catch((err) => {
      res.status(500).send({ status: "Opps! Error in loading the purchases" });
    });
});

// Get purchase history of a specific product
router.route("/product-history/:productName").get(async (req, res) => {
  const productName = req.params.productName;

  const retrieve = await Purchase.find({ "purchaseItems.productName": productName })
    .then((purchases) => {
      res.json(purchases);
    })
    .catch((err) => {
      res.status(500).send({ status: "Oops! Error in loading the purchase history" });
    });
});


// Get total purchases of a specific product within a given month
router
  .route("/total-purchases/:year/:month/:productName")
  .get(async (req, res) => {
    const year = parseInt(req.params.year); // Extract year from URL parameter
    const month = parseInt(req.params.month); // Extract month from URL parameter
    const productName = req.params.productName; // Extract product name from URL parameter

    if (isNaN(year) || isNaN(month)) {
      return res.status(400).json({ error: "Invalid year or month provided." });
    }

    // Calculate the start and end dates of the given month
    // const startDate = new Date(year, month - 1, 1);
    // const endDate = new Date(year, month - 1, 0);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0); // Set day to 0 to get the last day of the previous month

    // Get the last day of the specified month

    try {
      // Use MongoDB aggregation to count the number of purchases of the specific product within the specified month
      const result = await Purchase.aggregate([
        {
          $match: {
            purchaseDate: {
              $gte: startDate,
              $lte: endDate,
            },
            "purchaseItems.productName": productName,
          },
        },
        {
          $group: {
            _id: null,
            totalPurchases: { $sum: "$purchaseItems.quantity" }, // Sum the quantity for the specific product
          },
        },
      ]);

      if (result.length === 0) {
        // No purchases found for the given product and month
        return res.json({ totalPurchases: 0 });
      }

      // Return the total number of purchases of the specific product for the given month
      res.json({ totalPurchases: result[0].totalPurchases });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while calculating the total purchases.",
      });
    }
  });

module.exports = router;
