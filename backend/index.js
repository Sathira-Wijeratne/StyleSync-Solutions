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

const productRouter = require("./routes/product.js");
app.use("/product", productRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT : ${PORT}`);
});
