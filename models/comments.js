const connection = require('../connection')

exports.updateCommentVote = (id, voteUpdate) => {
    if (voteUpdate === undefined) { return Promise.reject({ status: 400, msg: 'Invalid Patch Request' }) }
    return connection('comments')
        .where('comment_id', id)
        .increment('votes', voteUpdate)
        .returning('*')
        .then(response => {
            if (response.length === 0) return Promise.reject({ status: 404, msg: 'Comment not found' })

            return response[0];
        })
}

exports.deleteCommentMachine = (id) => {
    return connection
        .del()
        .from('comments')
        .where('comment_id', id)
        .then(response => {
            return response
        })
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