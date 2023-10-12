const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define a new schema for buyer
const contactUsSchema = new Schema({
  name: {
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

  Inquery: {
    type: String,
    required: true,
  },
});

// create a model based on the buyer schema
const ContactUs = mongoose.model("Customer", contactUsSchema);

// export the Buyer model to be used in other parts of the application
module.exports = ContactUs;
