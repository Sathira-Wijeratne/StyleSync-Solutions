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

//Get all cart items of a buyer
router.route("/get/:buyerEmail").get(async (req, res) => {
    let buyerEmail = req.params.buyerEmail;

    const retrieve = await Cart.find({ "buyerEmail": buyerEmail }).then((cart) => {
        res.json(cart);
    }).catch((err) => {
        res.status(500).send({ status: "Opps! Error in loading the cart items" });
    })
})

//Remove a cart item
router.route("/remove/:buyerEmail/:productId").delete(async (req, res) => {
    let buyerEmail = req.params.buyerEmail;
    let productId = req.params.productId;
    await Cart.findOneAndDelete({ "buyerEmail": buyerEmail, "productId": productId }).then(() => {
        res.status(200).send({ status: "Item removed from the cart" });
    }).catch((err) => {
        res.status(500).send({ status: "Opps! Error in removing the item from the cart" });
    })
})


module.exports = router;