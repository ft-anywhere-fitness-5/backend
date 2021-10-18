const bcrypt = require('bcrypt')
const Users = require('../users/users')

const ROUNDS = process.env.ROUNDS || 8

const authController = {
    async register(req, res, next) {
        // req.body.password = await bcrypt.hash(req.body.password, parseInt(ROUNDS))
        // const { username, user_id } = await Users.addUser(req.body)
        // res.json({ username, user_id })
    }
}

module.exports = authController
