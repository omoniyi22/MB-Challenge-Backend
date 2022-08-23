const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();
let { DB } = require("./config");
const Routes = require("./routes/index");
const cors = require("cors");
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

Routes(router);

app.use("/v1/api", router);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("mongo started"));

app.listen(PORT, () => console.log("Server running"));
