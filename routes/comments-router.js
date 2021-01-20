const {
  updateCommentById,
  deleteCommentById,
} = require("../controllers/comments");
const commentsRouter = require("express").Router();

commentsRouter
  .route("/:comment_id")
  .patch(updateCommentById)
  .delete(deleteCommentById);

module.exports = commentsRouter;
