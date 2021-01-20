const {
  getArticleById,
  updateArticleById,
  postCommentById,
  getCommentsById,
  getAllArticles,
} = require("../controllers/articles");
const articlesRouter = require("express").Router();

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(updateArticleById)
  .post(postCommentById);

articlesRouter.route("/:article_id/comments").get(getCommentsById);
articlesRouter.route("/").get(getAllArticles);

module.exports = articlesRouter;
