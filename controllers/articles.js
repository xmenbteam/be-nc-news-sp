const {
  fetchArticleById,
  updateArticleById,
  fetchCommentsById,
  newComment,
  fetchAllArticles,
  deleteArticleMachine,
} = require("../models/articles");

exports.getArticleById = (req, res, next) => {
  // parametric endpoint:
  let articleId = req.params.article_id;
  fetchArticleById(articleId)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.updateArticleById = (req, res, next) => {
  let id = req.params.article_id;
  let votes = req.body.inc_votes;

  updateArticleById(id, votes)
    .then((article) => {
      res.status(200).send(article);
    })
    .catch(next);
};

exports.postCommentById = (req, res, next) => {
  // req.params - parametric endpoint
  // req.body - the sent comment.
  let article_id = req.params.article_id;
  let comment = req.body;
  // newComment() will process the request
  newComment(article_id, comment)
    .then((comment) => {
      // Formatted comment, including everything from MIGRATION.
      res.status(201).send(comment);
    })
    .catch(next);
};

exports.getCommentsById = (req, res, next) => {
  // articleId is a PARAMetric endpoint
  let articleId = req.params.article_id;
  // sortBy is a QUERY
  let sort_by = req.query.sort_by;
  let order = req.query.order;

  fetchCommentsById(articleId, sort_by, order)
    .then((comments) => {
      res.status(200).send(comments);
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  let sort_by = req.query.sort_by;
  let order = req.query.order;
  const author = req.query.author;
  const topic = req.query.topic;
  fetchAllArticles(sort_by, order, author, topic)
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch(next);
};
