const Users = require('../users/users-model')
const userSchema = require('./validation')
const jwt = require('jsonwebtoken')

function restricted(req, res, next) {
    const token = req.headers.authorization

    if(!token) return next({status: 401, message: 'User not logged in'})

    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
        if(err) return next({ status: 401, message: 'Invalid token' })
        req.decodedToken = decodedToken
        next()
    })
}

function only(userRole) {
    return function instructor(req, res, next){
        if(userRole === req.decodedToken.role) return next()
        next({ status: 403, source: 'Error with access role', message: 'access denied, incorrect role'})
    }
}

async function checkUsernameExists(req, res, next) {
    try {
        const user = await Users.findUser({ username: req.body.username })

        if(user && req.path === '/register') 
            return next({
                status: 400,
                source: 'Error while registering',
                message: 'username is taken',
            })
        
        if(req.path === '/login') {
            if(user) {
                req.user = user
                return next()
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
    only,
    checkUsernameExists,
    validateBody,
}
