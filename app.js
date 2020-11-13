const express = require('express');
const app = express();
const apiRouter = require("./routes/api-router.js");
const usersRouter = require('./routes/users-router.js');
const articlesRouter = require('./routes/articles-router')
const commentsRouter = require('./routes/comments-router')
const { send404, handlePSQLErrors, handleCustomErrors, handleInternalErrors } = require('./errors')

app.use(express.json());

app.use("/api", apiRouter);
app.use('/api/users', usersRouter);
app.use('/api/articles', articlesRouter)
app.use('/api/comments', commentsRouter)
app.all('/*', send404);

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handleInternalErrors);

module.exports = app;