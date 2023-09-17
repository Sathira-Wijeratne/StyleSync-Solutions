const router = require("express").Router();
const fs = require("fs");
const { parse } = require("csv-parse");

let products = [];
let toLine = 10;

router.route("/").get(async (req, res) => {
  // let products = [];
  if (products.length === 0) {
    fs.createReadStream(
      "./data/summer-products-with-rating-and-performance_2020-08.csv"
    )
      .pipe(parse({ delimiter: ",", from_line: 2, to_line: toLine }))
      .on("data", function (row) {
        products.push(row);
      })
      .on("end", function () {
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

router.route("/getDetails/:id").get(async (req, res) => {
  // let products = [];
  let productId = req.params.id;

  if (products.length === 0) {
    fs.createReadStream(
      "./data/summer-products-with-rating-and-performance_2020-08.csv"
    )
      .pipe(parse({ delimiter: ",", from_line: 2, to_line: toLine }))
      .on("data", function (row) {
        products.push(row);
      })
      .on("end", function () {
        const productDetails = products.find(
          (product) => product[40] == productId
        );
        res.json(productDetails);
      })
      .on("error", function (error) {
        console.log(error.message);
        res.status(500).send({
          status: "Error with fetching the product",
          error: error.message,
        });
      });
  } else {
    const productDetails = products.find((product) => product[40] == productId);
    res.json(productDetails);
  }
});

router
  .route("/discountedPrice/:productName/:discountRate")
  .get(async (req, res) => {
    if (products.length === 0) {
      fs.createReadStream(
        "./data/summer-products-with-rating-and-performance_2020-08.csv"
      )
        .pipe(parse({ delimiter: ",", from_line: 2, to_line: toLine }))
        .on("data", function (row) {
          products.push(row);
        });
    }
    const productName = req.params.productName;
    const discountRate = parseFloat(req.params.discountRate);

    const productDetails = products.find(
      (product) => product[1] === productName
    );

    if (!productDetails) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    const originalPrice = parseFloat(productDetails[2]);
    const discountedPrice = originalPrice * (discountRate / 100);

    res.json({ originalPrice, discountRate, discountedPrice });
  });

module.exports = router;
