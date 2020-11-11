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
    // if there's no vote count update, the error will be that you can't patch to something that isn't there.
    if (voteUpdate === undefined) { return Promise.reject({ status: 400, msg: 'Invalid Patch Request' }) }
    return connection
        .select("*")
        .from('articles')
        .where('article_id', id)
        .then(response => {
            if (response.length === 0) return Promise.reject({ status: 404, msg: 'Article not found' })
            // updates the votes with the new vote count.
            response[0]['votes'] = response[0]['votes'] + voteUpdate
            // response is an array with an object inside it.
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
            // returns an array -> we need an object - return first entry in array.
            // console.log(insComment)
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

exports.fetchAllArticles = () => {
    console.log('in the model')
    return connection
        .select('title',
            'article_id',
            'topic',
            'created_at',
            'votes')
        // .count('comments.article_id AS comment_count')
        .from('articles')
        // .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
        // .groupBy('articles.article_id')
        .then(response => {
            response.forEach(article => {
                console.log(article, 'article in resp')
                //THIS IS WHERE WE ARE
            })
            // console.log(response)
            if (response.length === 0) return Promise
                .reject({ status: 404, msg: 'Articles not found' })
            return response
        })
}


/*
GET /api/articles
Responds with
an articles array of article objects, each of which should have the following properties:
author which is the username from the users table
title
article_id
topic
created_at
votes
comment_count which is the total count of all the comments with this article_id - you should make use of knex queries in order to achieve this
Should accept queries
sort_by, which sorts the articles by any valid column (defaults to date)
order, which can be set to asc or desc for ascending or descending (defaults to descending)
author, which filters the articles by the username value specified in the query
topic, which filters the articles by the topic value specified in the query
*/