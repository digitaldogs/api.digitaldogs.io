const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const buildPath = path.join(__dirname, "../client/build");
const cors = require("cors");

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");
require("dotenv").config();
const app = express();
app.use(cors({ origin: "*" }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(buildPath));

app.use("/", indexRouter);
app.use("/api/v1", apiRouter);
app.get("/*", (req, res) => {
  res.sendFile(buildPath + "/index.html");
});

module.exports = app;
