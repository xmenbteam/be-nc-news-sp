const connection = require('../connection')

const fetchArticleById = (id) => {
    const query = connection
        .select("*")
        .from('articles')
        .where('article_id', id)
        // .innerJoin('comments', 'title', '=', 'comments.belongs_to')
        .then(response => {
            if (response.length === 0) return Promise.reject({ status: 404, msg: 'Route not found' })
            return response[0]
        })

    return query;
}

const changeVoteCount = (id, votes) => {
    const query = connection
        .select("*")
        .from('articles')
        .where('article_id', id)
        .update({ votes: connection.raw(+ votes) })
        .then(response => {
            console.log(response, 'response')
            if (response.length === 0) return Promise.reject({ status: 404, msg: 'Route not found' })
            return response[0]
        })

    return query;
}

module.exports = { fetchArticleById, changeVoteCount }