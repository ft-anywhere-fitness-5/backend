const router = require('express').Router();

router.get('/', (req, res, next) => res.json('get all classes'))

router.get('/:id', (req, res, next) => res.json('get class by id'))

router.post('/', (req, res, next) => res.json('create class'))

router.put('/:id', (req, res, next) => res.json('update a class'))

router.delete('/:id', (req, res, next) => res.json('delete a class'))

module.exports = router;
