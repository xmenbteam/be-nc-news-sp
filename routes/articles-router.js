const { getArticleById, updateArticleById, postCommentById, getCommentsById, getAllArticles } = require('../controllers/articles');
const articlesRouter = require('express').Router();


articlesRouter.route('/:article_id')
    .get(getArticleById)
    .patch(updateArticleById)
    .post(postCommentById);
articlesRouter.route('/:article_id/comments').get(getCommentsById);
articlesRouter.route('/').get(getAllArticles)

module.exports = articlesRouter;

/*
GET /api/articles
Responds with
an articles array of article objects, each of which should have the following properties:
author which is the username from the users table
title
article_id
topic
created_at
votes
comment_count which is the total count of all the comments with this article_id - you should make use of knex queries in order to achieve this
Should accept queries
sort_by, which sorts the articles by any valid column (defaults to date)
order, which can be set to asc or desc for ascending or descending (defaults to descending)
author, which filters the articles by the username value specified in the query
topic, which filters the articles by the topic value specified in the query
*/