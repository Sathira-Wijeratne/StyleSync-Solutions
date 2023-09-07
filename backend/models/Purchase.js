const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define a new schema for Purchases
const purchaseSchema = new Schema({
    buyerEmail: {
        type: String,
        required: true,
    },
    purchaseDate: {
        type: Date,
        required: true,
    },
    purchaseItems: {
        type: Array,
        required: true,
    },
    purchaseTotal: {
        type: String,
        required: true,
    }
});

// create a model based on the purchase schema
const Purchase = mongoose.model("Purchase", purchaseSchema);

// export the Purchase model to be used in other parts of the application
module.exports = Purchase;