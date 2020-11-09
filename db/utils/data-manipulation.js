const createAuthorRef = (userRows) => {
    const ref = {};
    userRows.forEach(user => {
        ref[user.username] = user.name;
    })
    return ref;
}

const formatArticleData = (articleData, authorRef) => {
    const formattedData = articleData
        .map(({ author, ...restOfArticle }) => {
            const newArticle = {
                ...restOfArticle,
                author: authorRef[author]
            }
            return newArticle
        })
    return formattedData
}

const formatDate = (articleData) => {
    const formattedArticle = articleData
        .map(({ created_at, ...restOfArticle }) => {
            const newArticle = {
                ...restOfArticle,
                created_at: new Date(created_at)
            }
            return newArticle
        })
    return formattedArticle
}

module.exports = { createAuthorRef, formatArticleData, formatDate }