const db = require('../data/db-config')

async function find() {
    return await db('turtles')
}

async function findById(id) {
    return await db('turtles')
    .where('turtle_id', id)
    .first()
}

async function add(turtle) {
    const [id] = await db('turtles').insert(turtle)
    return findById(id)
}

module.exports = {
    find,
    findById,
    add
}