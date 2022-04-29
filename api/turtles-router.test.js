const server = require('./server') 
const request = require('supertest')
const db = require('../data/db-config')
const Turtles = require('./turtles-model')

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('turtles').truncate();
    await db.seed.run()
});

afterAll(async () => {
    await db.destroy();
});

test('Sanity check', () => {
    expect(true).not.toBe(false)
});

test('Testing if environment is set to testing', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

describe('Http Api Test', () => {
    describe('Find turtles', () => {
        test('[1] Get all turtles', () => {
        })

        test('[2] Find turtles by id', async () => {
        })

        test('[3] Add new turtle', async () => {
        })
    })
})