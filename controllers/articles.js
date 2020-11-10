const { fetchArticleById, changeVoteCount } = require('../models/articles')

exports.getArticleById = (req, res, next) => {
    let articleId = req.params.article_id
    // works
    fetchArticleById(articleId)
        .then(id => {
            res.status(200)
                .send(id)
        }).catch(next);
}

exports.updateVotesbyId = (req, res, next) => {
    let id = req.params.article_id;
    let votes = req.body.inc_votes;
    // console.log(id, 'id')
    // console.log(votes, 'votes')
    changeVoteCount(id, votes)
        .then(article => {
            res.status(200)
                .send(article)
        }).catch(next)
}