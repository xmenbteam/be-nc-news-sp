const connection = require("../connection")

const fetchUserByUsername = (username) => {
    const query = connection
        .select('*')
        .from('users')
        .where('username', username)
        .then(response => {
            if (response.length === 0) return Promise.reject({ status: 404, msg: 'Route not found' })
            else return response[0]
        })
    return query;
}

module.exports = { fetchUserByUsername };