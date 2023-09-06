const router = require("express").Router();
let Cart = require("../models/Cart");

// Add new cart item
router.route("/add").post((req, res) => {
    const productId = req.body.productId;
    const productName = req.body.productName;
    const buyerId = req.body.buyerId;
    const productPrice = req.body.productPrice;
    const productImage = req.body.productImage;
    const productSize = req.body.productSize;
    const productReviewCount = req.body.productReviewCount;
    const productQuantity = req.body.productQuantity;

    const newCart = new Cart({
        productId,
        productName,
        buyerId,
        productPrice,
        productImage,
        productSize,
        productReviewCount,
        productQuantity,
    });

    newCart
        .save()
        .then(() => {
            res.json("Cart item Added.");
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;