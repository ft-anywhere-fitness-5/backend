const Users = require('../users/users')
const bcrypt = require('bcrypt')
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

router.post('/login', validateBody, checkUsernameExists, (req, res, next) => res.json('login'))

module.exports = router;
