const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const { restricted } = require('../api/auth/auth-middleware')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth', require('../api/auth/auth-router'))
server.use('/api/classes', require('../api/classes/classes-router'))

server.get('*', (req, res) => {
  res.send(`<h2>Anywhere Fitness API</h2>`)
})

server.use((err, req, res, next) => { //eslint-disable-line
  res.status(err.status || 500).json({
    source: err.source,
    message: err.message,
  })
})


module.exports = server
