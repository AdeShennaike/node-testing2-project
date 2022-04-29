const server = require('./server') 
const request = require('supertest')
const db = require('../data/db-config')

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

test('sanity check', () => {
    expect(true).not.toBe(false)
});

test('testing if environment is set to testing', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

test('testing if server is running', async () => {
    const res = await request.agent(server).get('/')
    expect(res.status).toBe(200)
})

describe('database test', () => {
    describe('find turtles', () => {
        test('[1] get all turtles from the database', () => {
        })
        
        test('[2] find turtles by id', async () => {
        })
        
        test('[3] add new turtle', async () => {
        })
        
        test('[4] testing if environment is set to testing', async () => {
        })
    })
})