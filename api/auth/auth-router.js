const router = require('express').Router();

router.post('/register', (req, res, next) => res.json('register'))

router.post('/login', (req, res, next) => res.json('login'))

module.exports = router;
