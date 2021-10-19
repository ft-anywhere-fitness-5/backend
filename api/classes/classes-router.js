const Classes = require('./classes-model')
const { validateId, validateBody } = require('./classes-middleware')
const { only, restricted } = require('../auth/auth-middleware')
const router = require('express').Router();

router.get('/', async (req, res, next) => {
    try {
        res.json(await Classes.getClasses())
    } catch {
        next({
            status: 400,
            source: 'Error while getting classes',
            message: 'Something went wrong'
        })
    }
})

router.get('/:id', validateId, async (req, res, next) => {
    try {
        res.json(req.eClass)
    } catch {
        next({
            status: 400,
            source: 'Error while getting the class by id',
            message: 'Something went wrong'
        })
    }
})

router.post('/', validateBody, restricted, only('instructor'), async (req, res, next) => {
    try {
        res.json(await Classes.addClass(req.body))
    } catch {
        next({
            status: 400,
            source: 'Error while adding the class',
            message: 'Something went wrong'
        })
    }
})

router.put('/:id', validateId, validateBody, restricted, only('instructor'), async (req, res, next) => {
    try {
        res.json(await Classes.updateClass(req.body, req.params.id))
    } catch (err) {
        next({
            status: 400,
            source: 'Error while updating the class',
            message: 'Something went wrong while updating'
        })
    }
})

router.delete('/:id', validateId, restricted, only('instructor'), async (req, res, next) => {
    try {
        res.json(await Classes.deleteClass(req.eClass.class_id))
    } catch (err) {
        next({
            status: 400,
            source: 'Error while deleting the class',
            message: 'Something went wrong'
        })
    }
})

module.exports = router;
