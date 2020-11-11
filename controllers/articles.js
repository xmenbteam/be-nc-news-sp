const { fetchArticleById, updateArticleById, fetchCommentsById, newComment, fetchAllArticles } = require('../models/articles')

exports.getArticleById = (req, res, next) => {
    // parametric endpoint:
    let articleId = req.params.article_id
    fetchArticleById(articleId)
        .then(article => {
            res.status(200)
                .send({ article })
        }).catch(next);
}

exports.updateArticleById = (req, res, next) => {
    let id = req.params.article_id;
    let votes = req.body.inc_votes;
    // console.log(id, 'id')
    // console.log(votes, 'votes')
    updateArticleById(id, votes)
        .then(article => {
            res.status(200)
                .send(article)
        }).catch(next)
}

exports.postCommentById = (req, res, next) => {
    // req.params - parametric endpoint
    // req.body - the sent comment.
    let articleId = req.params.article_id
    let comment = req.body
    // newComment() will process the request
    newComment(articleId, comment)
        .then(comment => {
            // Formatted comment, including everything from MIGRATION.
            res.status(201)
                .send(comment)
        }).catch(next)
}

exports.getCommentsById = (req, res, next) => {
    // articleId is a PARAMetric endpoint
    let articleId = req.params.article_id
    // sortBy is a QUERY
    let sortBy = req.query.sortBy
    let order = req.query.order
    // console.log(order, 'order')
    // console.log(sortBy, 'sortBy')
    fetchCommentsById(articleId, sortBy, order)
        .then(comments => {
            // console.log(comments, 'comments')
            res.status(200)
                .send(comments)
        }).catch(next);
}

exports.getAllArticles = (req, res, next) => {
    console.log('in the cont')
    fetchAllArticles()
        .then(articles => {
            res.status(200)
                .send(articles)
        }).catch(next);
}
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