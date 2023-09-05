const router = require("express").Router();
const fs = require("fs");
const { parse } = require("csv-parse");

// let products = [];

router.route("/").get(async (req, res) => {
  let products = [];
  if (products.length === 0) {
    fs.createReadStream(
      "./data/summer-products-with-rating-and-performance_2020-08.csv"
    )
      .pipe(parse({ delimiter: ",", from_line: 2, to_line: 5 }))
      .on("data", function (row) {
        products.push(row);
      })
      .on("end", function () {
        console.log("Finished");
        res.json(products);
      })
      .on("error", function (error) {
        console.log(error.message);
        res.status(500).send({
          status: "Error with getting the products",
          error: error.message,
        });
      });
  } else {
    res.json(products);
  }

});

// router.route("/getDetails/:id").get(async (req, res) => {
//   let products = [];

//   fs.createReadStream(
//     "./data/summer-products-with-rating-and-performance_2020-08.csv"
//   )
//     .pipe(parse({ delimiter: ",", from_line: 2, to_line: 5 }))
//     .on("data", function (row) {
//       products.push(row);
//     })
//     .on("end", function () {
//       console.log(products);
//       console.log("Finished");
//       // res.json(products);
//     })
//     .on("error", function (error) {
//       console.log(error.message);
//       // res.status(500).send({
//       //   status: "Error with getting the products",
//       //   error: error.message,
//       // });
//     });

//   let productId = req.params.id;
//   console.log(productId);
//   console.log("hello");

//   const productDetails = products.find((product) => product[40] == productId);

//   // if (products.length === 0) {
//   //   res.status(500).send({ status: "Error with get product", error: "Main product list empty" });
//   // }
//   // else if (productDetails.length !== 0) {
//   //   res.status(200).send({ status: "Product fetched", productDetails });
//   //   // res.json(productDetails);
//   // } else {
//   //   res.status(500).send({ status: "Error with get product", error: "Product not found" });
//   // }
// })

module.exports = router;
