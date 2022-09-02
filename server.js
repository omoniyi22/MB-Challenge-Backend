const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();
let { DB } = require("./config");
const Routes = require("./routes/index");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 8001;

const fileUpload = require('express-fileupload')
router.use(fileUpload())

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}));


const clientPath = path.join(__dirname, '/client/build/', "index.html")

app.use(express.static(path.join(__dirname, '/client/build')))


Routes(router);


app.use("/v1/api", router);
app.get("/*", (req, res) => {
  res.sendFile(clientPath)
})

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("mongo started"));

app.listen(PORT, () => console.log("Server running"));
