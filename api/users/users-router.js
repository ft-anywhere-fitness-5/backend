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

router.post('/:id', async (req, res, next) => {
    try{
        res.json(await Users.registerUserInClass(req.params.id, req.body.class_id))
    } catch {
        next({
            status: 400,
            source: 'Error with registering for the class',
            message: 'Something went wrong with registering'
        })
    }
})

router.delete('/:id', (req, res) => {
    res.json('unregister a user from a class')
})

module.exports = router
