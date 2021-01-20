const {
  updateCommentVote,
  deleteCommentMachine,
} = require("../models/comments");

exports.updateCommentById = (req, res, next) => {
  let id = req.params.comment_id;
  let votes = req.body.inc_votes;
  updateCommentVote(id, votes)
    .then((comment) => {
      res.status(200).send(comment);
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  let id = req.params.comment_id;

  deleteCommentMachine(id)
    .then((comment) => {
      res.sendStatus(204);
    })
    .catch(next);
};
