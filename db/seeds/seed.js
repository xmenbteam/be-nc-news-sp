
const {
  topicData,
  userData,
  articleData,
  commentData,
} = require('../data/index.js');

const { createAuthorRef, formatArticleData, formatDate } = require('../utils/data-manipulation')

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
      const authorRef = createAuthorRef(userRows);
      const formattedArticle = formatArticleData(articleData, authorRef)
      const dateFormatArticle = formatDate(formattedArticle)
      console.log(dateFormatArticle)
      return dateFormatArticle;
    })
};
