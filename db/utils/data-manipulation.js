const createArticleRef = (articleRows) => {
    const ref = {};
    articleRows.forEach(article => {
        ref[article.title] = article.article_id;
    })
    return ref;
}

const createAuthorRef = (userRows) => {
    const ref = {};
    userRows.forEach(user => {
        ref[user.username] = user.name;
    })
    return ref;
}

const formatCommentData = (commentData, articleRef) => {
    const formattedData = commentData
        .map(({ belongs_to, created_by, ...restOfComment }) => {
            const newComment = {
                ...restOfComment,
                article_id: articleRef[belongs_to],
                author: created_by
            }
            return newComment
        })
    return formattedData
}


const formatDate = (data) => {
    const formattedData = data
        .map(({ created_at, ...restOfData }) => {
            const newData = {
                ...restOfData,
                created_at: new Date(created_at),
            }
            return newData
        })
    return formattedData
}

module.exports = { createArticleRef, formatCommentData, formatDate, createAuthorRef }