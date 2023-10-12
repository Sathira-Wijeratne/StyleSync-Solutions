const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.set("strictQuery", true);

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection Success!");
});

const testRouter = require("./routes/test.js");
app.use("/test", testRouter);

const adminRouter = require("./routes/admin.js");
app.use("/admin", adminRouter);

const customerRouter = require("./routes/customer.js");
app.use("/customer", customerRouter);

const discountRouter = require("./routes/discount.js");
app.use("/discount", discountRouter);

const productRouter = require("./routes/product.js");
app.use("/product", productRouter);

const rateRouter = require("./routes/rating.js");
app.use("/rating", rateRouter);

const cartRouter = require("./routes/cart.js");
app.use("/cart", cartRouter);

const purchaseRouter = require("./routes/purchase.js");
app.use("/purchases", purchaseRouter);

const predictionRouter = require("./routes/prediction.js");
app.use("/prediction", predictionRouter);

const contactUsRouter = require("./routes/contactus.js");
app.use("/contactus",contactUsRouter);



// --------- EXECUTING PREDICTION MODEL - BEGIN ----------------
const { execFile } = require("child_process");
app.post("/prediction", (req, res) => {
  try {
    const inputs = JSON.stringify(req.body);
    execFile(
      "python",
      ["./python/baggingclassifier.py", inputs],
      (error, stdout, stderr) => {
        if (error) {
          console.error("Error executing Python script:", error);
          res
            .status(500)
            .send("An error occurred while processing your request.");
          return;
        }
        stdout = stdout.replaceAll("'", '"');
        stdout = JSON.parse(stdout);
        res.send(stdout);
      }
    );
  } catch (error) {
    console.error("Error in processing:", error);
    res.status(500).send("An error occurred while processing your request.");
  }
});
// --------- EXECUTING PREDICTION MODEL - END ------------------

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT : ${PORT}`);
});
