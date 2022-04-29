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

test('Testing if server is running', async () => {
    const res = await request(server).get('/')
    expect(res.status).toBe(200)
})

describe('Database Test', () => {
    test('[1] Get all turtles from the database', async () => {
        const result = await Turtles.find();
        expect(result.constructor.name).toBe('Array');
        expect(result.length).toBe(3);
        expect(result[0]).toMatchObject({ name: 'leonardo' });
    })

    test('[2] Find turtles by id', async () => {
        let result = await Turtles.findById(1);
        expect(result.name).toBe('leonardo');
        expect(result).toBeDefined();
        result = await Turtles.findById(0);
        expect(result).not.toBeDefined();
    })

    test('[3] Add new turtle', async () => {
        let result = await Turtles.add({name: 'splinter', weapon: 'cane', color: 'brown'})
        expect(result.name).toBe('splinter')
        expect(result.turtle_id).toBe(4);
        result = await Turtles.find();
        expect(result.length).toBe(4); 
    })
})