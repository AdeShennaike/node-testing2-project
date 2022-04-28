const express = require('express')
const server = express()
const turtlesRouter = require('./turtles-router')

server.use(express.json())
server.use('/api/turtles', turtlesRouter)

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = server;