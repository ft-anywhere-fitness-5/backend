const Classes = require('./classes-model')

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

router.get('/:id', async (req, res, next) => {
    try {
        res.json(await Classes.getClassById(req.params.id))
    } catch (err) {
        next(err)
        // next({
        //     status: 400,
        //     source: 'Error while getting classes',
        //     message: 'Something went wrong'
        // })
    }
})

router.post('/', (req, res, next) => res.json('create class'))

router.put('/:id', (req, res, next) => res.json('update a class'))

router.delete('/:id', (req, res, next) => res.json('delete a class'))

module.exports = router;
