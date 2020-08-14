const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

// connection
const key = process.env.MONGO_URI;
mongoose.connect(key, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("database connected");
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// image
app.use("/uploads/images", express.static(path.join("uploads", "images")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRouter = require("./routes/users");

app.use("/", userRouter);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
