const { fetchUserByUsername } = require('../models/users')

exports.getUserByUsername = (req, res, next) => {
    let user = req.params.username
    // console.log(user, 'user')
    fetchUserByUsername(user).then(user => {
        res.status(200)
            .send(user)
    }).catch(next)
}