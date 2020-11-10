const connection = require('../connection')

exports.fetchAllTopics = () => {
    const query = connection
        .select('*')
        .from('topics')
        .then(topicsRows => {
            return topicsRows
        })
    return query;
}