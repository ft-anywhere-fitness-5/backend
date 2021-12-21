const classesController = require('./classes-controller')
const { validateId, validateBody } = require('./classes-middleware')
const { only, restricted } = require('../auth/auth-middleware')
const router = require('express').Router();

const INSTRUCTOR_ROLE = 'instructor'

router.get('/', classesController.getAllClasses)

router.get('/:id', validateId, classesController.getClassById)
// add instructor id so i can make it so instructors can only edit their own classes 
router.post('/', validateBody, restricted, only(INSTRUCTOR_ROLE), classesController.createClass)


router.put('/:id', validateId, validateBody, restricted, only(INSTRUCTOR_ROLE), classesController.updateClass)

router.delete('/:id', validateId, restricted, only(INSTRUCTOR_ROLE), classesController.deleteClass)

router.use('*', classesController.notFound)

module.exports = router;
