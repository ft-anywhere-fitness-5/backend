const Users = require('../users/users')
const bcrypt = require('bcrypt')
const buildToken = require('./utils/buildToken')
const { validateBody, checkUsernameExists } = require('./auth-middleware')
const ROUNDS = process.env.ROUNDS || 8

const router = require('express').Router();

router.post('/register', validateBody, checkUsernameExists, async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, parseInt(ROUNDS))
        const { username, user_id } = await Users.addUser(req.body)
        res.json({ username, user_id })
    } catch (err) {
        next(err)
    }
})

router.post('/login', validateBody, checkUsernameExists, async (req, res, next) => {
        const verifiedPassword = await bcrypt.compare(req.body.password, req.user.password)
        const token = buildToken(req.user)
        if(verifiedPassword) {
            res.status(200).json({ 
                message: `Hello ${req.user.username}`,
                token
             })
        } else {
            next({
                status: 401,
                source: 'Error while logging in',
                message: 'Incorrect password'
            })
        }
})

module.exports = router;
