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

    const retrieve = await Purchase.find({ "buyerEmail": buyerEmail }).then((purchase) => {
        res.json(purchase);
    }).catch((err) => {
        res.status(500).send({ status: "Opps! Error in loading the purchases" });
    })
})

module.exports = router;