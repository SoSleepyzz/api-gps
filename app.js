const express = require("express");
const indexRouter = require("./api/index.js");

const app = express();

app.use(express.json());
app.use("/api", indexRouter);

module.exports = { app };
