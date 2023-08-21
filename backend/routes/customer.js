const router = require("express").Router();
let Customer = require("../models/Customer");

// Add new customer
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const nic = req.body.nic;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;

  const newCustomer = new Customer({
    name,
    nic,
    email,
    phone,
    password,
  });

  newCustomer
    .save()
    .then(() => {
      res.json("Customer Added.");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get all customers
router.route("/").get((req, res) => {
  Customer.find()
    .then((customer) => {
      res.json(customer);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete customer by ID
router.route("/delete/:id").delete(async (req, res) => {
  let customerId = req.params.id;

  await Customer.findByIdAndDelete(customerId)
    .then(() => {
      res.status(200).send({ status: "Customer Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete Customer", error: err.message });
    });
});

// Get customer by ID
router.route("/get/:id").get(async (req, res) => {
  let customerId = req.params.id;
  const customer = await Customer.findById(customerId)
    .then((customer) => {
      res.status(200).send({ status: "Customer fetched", customer });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get customer", error: err.message });
    });
});

// Get customer by email
router.route("/get/email/:email").get(async (req, res) => {
  let email = req.params.email;
  await Customer.find({ email: `${email}` })
    .then((customer) => {
      res.json(customer);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get the customer", error: err.message });
    });
});

// Update customer details by email
router.route("/update/:paramemail").put(async (req, res) => {
  let paramemail = req.params.paramemail;
  const { name, nic, email, phone, password } = req.body;
  const updateCustomer = {
    name,
    nic,
    email,
    phone,
    password,
  };

  await Customer.findOneAndUpdate({ email: paramemail }, updateCustomer)
    .then(() => {
      res.status(200).send({ status: "Customer Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        status: "Error with updating the customer",
        error: err.message,
      });
    });
});

// Delete customer by email
router.route("/delete/email/:paraemail").delete(async (req, res) => {
  let customerEmail = req.params.paraemail;

  await Customer.findOneAndDelete({ email: customerEmail })
    .then(() => {
      res.status(200).send({ status: "Customer Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete customer", error: err.message });
    });
});

module.exports = router;
