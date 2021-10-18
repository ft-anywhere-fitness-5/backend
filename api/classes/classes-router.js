const Classes = require('./classes-model')
const { validateId, validateBody } = require('./classes-middleware')
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

router.post('/', async (req, res, next) => {
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

router.put('/:id', (req, res, next) => res.json('update a class'))

router.delete('/:id', (req, res, next) => res.json('delete a class'))

module.exports = router;
