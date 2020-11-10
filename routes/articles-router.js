const { getArticleById, updateVotesbyId } = require('../controllers/articles');
const articlesRouter = require('express').Router();

articlesRouter.route('/:article_id').get(getArticleById).patch(updateVotesbyId);

module.exports = articlesRouter;