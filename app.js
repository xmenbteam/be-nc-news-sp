const express = require('express');
const app = express();
const apiRouter = require("./routes/api-router.js");
const usersRouter = require('./routes/users-router.js');
const articlesRouter = require('./routes/articles-router')
const { send404, handlePSQLErrors, handleCustomErrors } = require('./errors')

app.use(express.json());

app.use("/api", apiRouter);
app.use('/api/users', usersRouter);
app.use('/api/articles', articlesRouter)
app.all('/*', send404);

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
// app.use(handleInternalErrors);

module.exports = app;