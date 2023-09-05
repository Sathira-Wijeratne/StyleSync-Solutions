const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const discountSchema = new Schema({
  discountId: {
    type: String,
    required: true,
  },

  discountType: {
    type: String,
    required: true,
  },
  discountRate: {
    type: Number,
    rqeuired: true,
  },
  discountProductName: {
    type: String,
    rqeuired: true,
  },
  discountDescription: {
    type: String,
    required: true,
  },
  discountStartDate: {
    type: Date,
    rqeuired: true,
  },
  discountExpirationDate: {
    type: Date,
    required: true,
  },
});

const Discount = mongoose.model("Discount", discountSchema);

module.exports = Test;
