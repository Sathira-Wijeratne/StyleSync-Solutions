const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define a new schema for cart
const cartSchema = new Schema({
    productId: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    buyerId: {
        type: String,
        required: true,
    },
    productPrice: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    productSize: {
        type: String,
        required: true,
    },
    productReviewCount: {
        type: Number,
        required: true,
    },
    productQuantity: {
        type: Number,
        required: true,
    }
});

// create a model based on the cart schema
const Cart = mongoose.model("Cart", cartSchema);

// export the Cart model to be used in other parts of the application
module.exports = Cart;