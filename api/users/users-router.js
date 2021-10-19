const Users = require('./users-model')

const router = require('express').Router()

router.get('/:id', async (req, res, next) => {
    try{
        res.json(await Users.getUserClasses(req.params.id))
    } catch {
        next({
            status: 400,
            source: 'error while fetching users classes',
            message: 'Cannot get users classes'
        })
    }
    
})

router.post('/:id', (req, res) => {
    res.json('register a user in a class')
})

router.delete('/:id', (req, res) => {
    res.json('unregister a user from a class')
})

module.exports = router
