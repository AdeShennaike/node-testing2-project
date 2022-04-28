const express = require('express')
const server = express()
const turtlesRouter = require('./turtles-router')

server.use(express.json())
server.use('/api/turtles', turtlesRouter)

module.exports = server;