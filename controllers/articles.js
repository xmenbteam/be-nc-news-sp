const { fetchArticleById, updateArticleById, fetchCommentsById, newComment, fetchAllArticles, deleteArticleMachine } = require('../models/articles')

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
            // console.log(article, 'article in contorller')
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
    let sort_by = req.query.sort_by
    let order = req.query.order
    // console.log(order, 'order')
    // console.log(sortBy, 'sortBy')
    fetchCommentsById(articleId, sort_by, order)
        .then(comments => {
            // console.log(comments, 'comments')
            res.status(200)
                .send(comments)
        }).catch(next);
}

exports.getAllArticles = (req, res, next) => {
    // console.log(req.query, 'req query')
    // console.log(Object.values(req.query)[0], 'query')
    let sort_by = req.query.sort_by
    let order = req.query.order
    const author = req.query.author
    const topic = req.query.topic
    // console.log('in the cont')
    fetchAllArticles(sort_by, order, author, topic)
        .then(articles => {
            res.status(200)
                .send(articles)
        }).catch(next);
}

// exports.deleteArticleById = (req, res, next) => {

//     let id = req.params.article_id
//     // console.log(id, 'id')
//     deleteArticleMachine(id)
//         .then(article => {
//             console.log(article, 'article in cont')
//             res.sendStatus(204)
//         }).catch(next)
// }