const express = require("express");
const logger = require("morgan");

const cors = require("cors");

const apiRouter = require("./routes/api");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*" }));

app.use(logger("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));


app.use("/api/v1", apiRouter);

const port = process.env.port || 3000;
app.listen(port);

//module.exports = app;
