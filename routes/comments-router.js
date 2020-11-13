const { updateCommentById, deleteCommentById } = require('../controllers/comments')
const commentsRouter = require('express').Router();

commentsRouter.route('/:comment_id').patch(updateCommentById).delete(deleteCommentById);

module.exports = commentsRouter
/*
PATCH / api / comments /: comment_id
Request body accepts
an object in the form { inc_votes: newVote }

newVote will indicate how much the votes property in the database should be updated by
e.g.

{ inc_votes: 1 } would increment the current comment's vote property by 1

{ inc_votes: -1 } would decrement the current comment's vote property by 1

Responds with
the updated comment
DELETE / api / comments /: comment_id
Should
delete the given comment by comment_id
Responds with
status 204 and no content
*/