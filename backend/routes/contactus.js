const router = require("express").Router();
let ContactUs = require("../models/ContactUs");

// Add new customer
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const Inquery = req.body.Inquery;

  const newContact = new ContactUs({
    name,
    email,
    phone,
    Inquery,
  });

  newContact
    .save()
    .then(() => {
      res.json("Inquery Added.");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get all Requests
router.route("/").get((req, res) => {
    ContactUs.find()
    .then((contact) => {
      res.json(contact);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete customer by ID
router.route("/delete/:id").delete(async (req, res) => {
  let contactId = req.params.id;

  await ContactUs.findByIdAndDelete(contactId)
    .then(() => {
      res.status(200).send({ status: "Inquery Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting inquery", error: err.message });
    });
});

// Get customer by ID
router.route("/get/:id").get(async (req, res) => {
  let contactId = req.params.id;
  const contact = await ContactUs.findById(customerId)
    .then((contact) => {
      res.status(200).send({ status: "Customer fetched", contact });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get customer", error: err.message });
    });
});

module.exports = router;
