const connection = require('../connection')

exports.fetchArticleById = (id) => {
    /*
BASICALLY, right, this will take the id (req.params.article_id from the controller)
and use it to get the article out of the articles database.
It will then link it with which article is tagge in the comments database;
'AS' -> will create a new column.
*/
    const query = connection
        .select("articles.*")
        .count('comments.article_id AS comment_count')
        .from('articles')
        .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
        .where('articles.article_id', id)
        .groupBy('articles.article_id')
        .then(response => {
            // if we don't get a response, go to the error handler:
            if (response.length === 0) return Promise.reject({ status: 404, msg: 'Article not found' })
            return response[0];
        })
    return query;
}

exports.updateArticleById = (id, voteUpdate) => {
    // console.log('hello from the model')
    // if there's no vote count update, the error will be that you can't patch to something that isn't there.
    if (voteUpdate === undefined) { return Promise.reject({ status: 400, msg: 'Invalid Patch Request' }) }
    return connection('articles')
        .where('article_id', id)
        .increment('votes', voteUpdate)
        .returning('*')
        .then(response => {
            // console.log(response, 'response in model')
            if (response.length === 0) return Promise.reject({ status: 404, msg: 'Article not found' })

            return response[0];
        })
}

exports.newComment = (article_id, comment) => {
    /* 
    We get a comment with a username property but it needs to be author 
    - change to author:
    */
    let formattedCom = { ...comment };
    formattedCom.author = formattedCom.username;
    formattedCom.article_id = article_id
    delete formattedCom.username
    /*
    gives us:   
    {
        body: 'REVIEW BLAH',
        author: 'what was passed as username',
        article_id: 'number as a string'
      }
    */

    // POST formatted comment into database
    return connection
        .into('comments')
        .insert(formattedCom)
        .returning('*')
        .then(insComment => {
            // if (insComment.length === 0) return Promise
            //     .reject({ status: 404, msg: 'Articles not found' })
            // // returns an array -> we need an object - return first entry in array.
            // // console.log(insComment)
            return insComment[0]
        })
}

exports.fetchCommentsById = (articleId, sortBy = 'created_at', order = 'DESC') => {
    /*
    Get all the comments related to an article...
    Article 5 has 2 comments...
    */
    // console.log(articleId, sortBy, order)
    return connection
        .select('comment_id',
            'author',
            'votes',
            'created_at',
            'body')
        .from('comments')
        .where('comments.article_id', '=', articleId)
        .orderBy(sortBy, order)
        .then(response => {
            // console.log(response, 'model response')
            if (response.length === 0) return Promise
                .reject({ status: 404, msg: 'Comments not found' })
            return response
        })
}

exports.fetchAllArticles = (sort_by = 'created_at', order = 'DESC', author, topic) => {
    // console.log('in the model')
    /*
    Was having a bad time with the ambiguity of the query.
    NEED ERROR HANDLING.
    */
    // console.log(sort_by, 'sortby')
    if (sort_by === 'date') sort_by = 'created_at'
    else if (sort_by === 'title') sort_by = 'articles.title'
    return connection
        .select('articles.author',
            'articles.title',
            'articles.article_id',
            'topic',
            'articles.created_at',
            'articles.votes')
        .from('articles')
        .modify((query) => {
            if (author) {
                query.where('articles.author', '=', author)
            }
            else if (topic) {
                query.where('topic', '=', topic)
            }
        })
        .count('comments.article_id AS comment_count')
        .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
        .groupBy('articles.article_id')
        .orderBy(sort_by, order)
        .then(response => {
            // console.log(response, 'model response')
            if (response.length === 0) return Promise
                .reject({ status: 404, msg: 'Articles not found' })
            else return response;
        })
}

// exports.deleteArticleMachine = (id) => {
//     return connection
//         .del()
//         .from('articles')
//         .where('article_id', id)
//         .then(response => {
//             console.log(response, 'delete response')
//         })
// }