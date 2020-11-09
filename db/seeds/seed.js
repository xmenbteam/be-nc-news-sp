
const {
  topicData,
  userData,
  articleData,
  commentData,
} = require('../data/index.js');

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
      console.log(userRows)
      return userRows
    })
};
