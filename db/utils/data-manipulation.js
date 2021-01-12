// Create reference object to link article title and article ID:
const createArticleRef = (articleRows) => {
  const ref = {};
  articleRows.forEach((article) => {
    ref[article.title] = article.article_id;
  });
  return ref;
};
// Create a means to reference author in other tables -
// e.g. Article uses user property where previously had username.
const createAuthorRef = (userRows) => {
  const ref = {};
  userRows.forEach((user) => {
    ref[user.username] = user.name;
  });
  return ref;
};
/*
- Formats comments so that they have the right attributes for the specs:
- Article ID which references the author of the article the comment is associated with
- Turn 'created by' into 'author'..
- Use deconstructing to create a new object with new paramaters, .map() the array of objects.
 */
const formatCommentData = (commentData, articleRef) => {
  const formattedData = commentData.map(
    ({ belongs_to, created_by, ...restOfComment }) => {
      const newComment = {
        ...restOfComment,
        article_id: articleRef[belongs_to],
        author: created_by,
      };
      return newComment;
    }
  );
  return formattedData;
};

/*
- Similar to formatCommentData;
- uses new Date() - creates new date object which is right now.
*/

const formatDate = (data) => {
  const formattedData = data.map(({ created_at, ...restOfData }) => {
    const newData = {
      ...restOfData,
      created_at: new Date(created_at),
    };
    return newData;
  });
  return formattedData;
};

module.exports = {
  createArticleRef,
  formatCommentData,
  formatDate,
  createAuthorRef,
};
