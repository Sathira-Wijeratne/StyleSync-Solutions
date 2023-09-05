const router = require("express").Router();
const fs = require("fs");
const { parse } = require("csv-parse");

router.route("/get/products").get(async (req, res) => {
  let products = [];

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
});

module.exports = router;
