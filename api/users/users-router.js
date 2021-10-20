const Users = require('./users-model')

const router = require('express').Router()

router.get('/', async (req, res, next) => {
    const user_id = req.decoded.subject
    try{
        res.json(await Users.getUserClasses(user_id))
    } catch (err) {
        next(err)
        // next({
        //     status: 400,
        //     source: 'error while fetching users classes',
        //     message: 'Cannot get users classes'
        // })
    }   
})

router.post('/:id', async (req, res, next) => {
    try{
        res.json(await Users.registerUserInClass(req.params.id, req.body.class_id))
    } catch (err) {
        next(err)
        // next({
        //     status: 400,
        //     source: 'Error with registering for the class',
        //     message: 'Something went wrong with registering'
        // })
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        res.json(await Users.removeUserFromClass(req.params.id, req.body.class_id))
    } catch (err) {
        next(err)
        // next({
        //     status: 400,
        //     source: 'Error when deleting a class',
        //     message: 'Could not delete the user from class'
        // })
    }
})

module.exports = router
