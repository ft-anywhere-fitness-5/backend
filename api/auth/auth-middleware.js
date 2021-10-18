const Users = require('../users/users')
const userSchema = require('./validation')

function restricted(req, res, next) {
    next()
}

async function checkUsernameExists(req, res, next) {
    try {
        const user = await Users.findUser({ username: req.body.username })

        if(user && req.path === 'register') 
            return next({
                status: 400,
                source: 'Error while registering',
                message: 'username is taken',
            })
        
            if(req.path === 'login') {
                if(user) {
                    req.user = user
                    next()
                } else {
                    return next({
                        status: 400,
                        source: 'Error while login',
                        message: 'That user does not exist',
                    })
                }
            }
            next()

    } catch {
        next({
            status: 400,
            source: 'username validation',
            message: 'Something went wrong locating the username'
        })
    }
}

async function validateBody(req, res, next) {
    try {
        req.body = await userSchema.validateAsync(req.body, {stripUnknown: true})
        next()
    } catch (err) {
        next({
            status: 400,
            source: "Error with username or password entry",
            message: err.details[0].message,
        })
    }
}

module.exports = {
    restricted,
    checkUsernameExists,
    validateBody,
}
