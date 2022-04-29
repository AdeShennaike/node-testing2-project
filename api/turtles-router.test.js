const server =require('./server') 
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
    test('[1] GET /turtles', async () => {
        let res = await request(server).get('/api/turtles')
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(3)
    })
    
    test('[2] GET /turtles/:id', async () => {
        let res = await request(server).get('/api/turtles/1')
        expect(res.body.turtle_id).toBe(1)
        res = await request(server).get('/turtles/10')
        expect(res.status).toBe(404)
    })
    
    test('[3] POST /turtles', async () => {
        let res = await request(server).post('/api/turtles').send({name: 'donatello', weapon: 'bo staff', color: 'purple'})
        expect(res.body.name).toBe('donatello')
        expect(res.body.turtle_id).toBe(4);
        res = await Turtles.find();
        expect(res.length).toBe(4); 
    })
})