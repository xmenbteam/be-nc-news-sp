
const {
  topicData,
  userData,
  articleData,
  commentData,
} = require('../data/index.js');

const { createArticleRef, formatCommentData, formatDate } = require('../utils/data-manipulation')

exports.seed = function (connection) {
  return connection.migrate
    .rollback()
    .then(() => {
      return connection.migrate.latest()
    })
    .then(() => {
      return connection.insert(topicData).into('topics').returning('*');
    })
    .then((topicRows) => {
      console.log(`added ${topicRows.length} topics`)
      return connection.insert(userData).into('users').returning('*');
    })
    .then((userRows) => {
      console.log(`added ${userRows.length} users`)
      const dateFormatArticle = formatDate(articleData)
      return connection.insert(dateFormatArticle).into('articles').returning('*')
    })
    .then(articleRows => {
      console.log(`added ${articleRows.length} users`)
      const dateFormatComment = formatDate(commentData)
      const articleRef = createArticleRef(articleRows)
      const formattedComment = formatCommentData(dateFormatComment, articleRef)
      console.log(formattedComment)

      return connection.insert(formattedComment).into('comments').returning('*')
    })
};
