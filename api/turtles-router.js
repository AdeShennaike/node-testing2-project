const express = require('express')
const router = express.Router()
const Turtle = require('./turtles-model')

router.get('/', (req, res, next) => {
    Turtle.find()
        .then(turtles => {
            res.json(turtles)
        })
        .catch(err => {
            next(err)
        })
})

router.get('/:id', (req, res, next) => {
    Turtle.findById(req.params.id)
        .then(turtles => {
            if(!turtles){
                next({ status: 401, message: `${req.params.id} not found` })
            }else{
                res.json(turtles)
            }
        })
        .catch(err => {
            next(err)
        })
})

router.post('/', (req, res, next) => {
    if (!req.body.name || !req.body.weapon){
        next({ status: 404, message: `name and weapon required` })
    }else{
        Turtle.add(req.body)
            .then(turtles => {
                res.status(201).json(turtles)
            })
            .catch(err => {
                next(err)
            })
    }
})

module.exports = router