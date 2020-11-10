const express = require('express');
const app = express();
const apiRouter = require("./routes/api-router.js")

app.use(express.json());

app.use("/api", apiRouter);
// app.all('/*', send404);

// app.use(handleInternalErrors);

module.exports = app;