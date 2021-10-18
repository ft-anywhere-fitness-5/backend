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
    try {
        const verifiedPassword = await bcrypt.compare(req.body.password, req.user.password)
        if(verifiedPassword) {
            res.json({
                message: `welcome back ${req.user.username}`,
                token: buildToken(req.user)
            })
        } else {
            next({
                status: 400,
                source: 'Error while logging in',
                message: 'Incorrect password'
            })
        }

    } catch (err) {
        next(err)
    }
})

module.exports = router;
