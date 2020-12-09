const { updateCommentVote, deleteCommentMachine } = require('../models/comments')

exports.updateCommentById = (req, res, next) => {
    let id = req.params.comment_id
    let votes = req.body.inc_votes;
    updateCommentVote(id, votes)
        .then(comment => {
            res.status(200)
                .send(comment)
        }).catch(next)
}

exports.deleteCommentById = (req, res, next) => {

    let id = req.params.comment_id
    // console.log(id, 'id')
    deleteCommentMachine(id)
        .then(comment => {
            console.log(comment, 'comment in cont')
            res.sendStatus(204)
        }).catch(next)
}
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