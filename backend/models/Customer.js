const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define a new schema for buyer
const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  nic: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

// create a model based on the buyer schema
const Customer = mongoose.model("Customer", customerSchema);

// export the Buyer model to be used in other parts of the application
module.exports = Customer;
