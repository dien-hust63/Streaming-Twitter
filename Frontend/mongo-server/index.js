const express = require("express");
const mongoose = require("mongoose");
const configs = require("./configs");
const { port } = configs;
const indexRouter = require("./routers");

(async () => await mongoose.connect(configs.db.url))().catch((err) =>
  console.error(err)
);

const app = express();

const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
const urlencoded = express.urlencoded({ extended: false });

app.use(allowCrossDomain);
app.use(urlencoded);
app.use(indexRouter);

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
