const send404 = (req, res, next) => {
    res.status(404).send({ msg: 'Article not found' })
}

const handlePSQLErrors = (err, req, res, next) => {
    const badReqCodes = [];
    if (badReqCodes.includes(err.code)) {
        res.status(400).send({ msg: 'bad request' })
    } else {
        next(err);
    }
}

const handleCustomErrors = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg });
    } else {
        next(err);
    }
}

const handleInternalErrors = (err, req, res, next) => {
    /*
    THIS IS WHERE YOUR ERRORS GO AT THE END
    Use the console.log to see where your error is coming from.
    */
    console.log(err)
    res.status(500).send({ msg: 'dno m8 soz' })
}

module.exports = { send404, handleCustomErrors, handlePSQLErrors, handleInternalErrors }