const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const spawn = require("child_process").spawn;

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

// ---------------------------------------------------------------------------------------------

// app.post("/prediction", async (req, res) => {
//   try {
//     var test = JSON.stringify(req.body);
//     let data1 = "";
//     const pythonProcess = spawn("python", [
//       "./python/baggingclassifier.py",
//       test,
//     ]);
//     pythonProcess.stdout.on("data", (data) => {
//       data1 = data1 + data.toString();
//     });

//     await new Promise((resolve, reject) => {
//       pythonProcess.on("close", (code) => {
//         console.log("Code: ", code);
//         resolve();
//       });
//       pythonProcess.on("error", (err) => {
//         console.error("Error executing Python script:", err);
//         reject(err);
//       });
//     });

//     res.send(data1);
//   } catch (error) {
//     console.error("Error executing Python script:", error);
//     res.status(500).send("An error occurred while processing your request.");
//   }
// });

// --------------------------------------------------------------------------------------------------

const { execFile } = require("child_process");

app.post("/prediction", (req, res) => {
  try {
    const test = JSON.stringify(req.body);

    execFile(
      "python",
      ["./python/baggingclassifier.py", test],
      (error, stdout, stderr) => {
        if (error) {
          console.error("Error executing Python script:", error);
          res
            .status(500)
            .send("An error occurred while processing your request.");
          return;
        }

        console.log("Python script output:", stdout);

        res.send(stdout);
      }
    );
  } catch (error) {
    console.error("Error in processing:", error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

// -----------------------------------------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT : ${PORT}`);
});
