const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')

const class1 = {
    "class_name": 'Exploring Trails',
    "class_type": 'Hiking',
    "class_start_time": '1:30 a.m.',
    "class_duration": '5',
    "class_intensity": 'low',
    "class_location": 'Park',
    "class_registered_attendees": '0',
    "class_max_size": '10',
}

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
  await request(server).post('/api/auth/register').send({ username: 'Virginia', password: 'Richmond', role: 'instructor' })
})
afterAll(async () => {
  await db.destroy()
})

describe('[GET] /', () => {
    let res
    it('responds with an array of classes', async () => {
        res = await request(server).get('/api/classes')
        expect(res.body).toHaveLength(1)
    })
})

describe('[GET] /:id', () => {
    let res
    it('responds with the class with the specified id', async () => {
        res = await request(server).get('/api/classes/1')
        expect(res.body).toHaveProperty('class_id', 1)
    })
})

describe('[POST] /', () => {
    beforeEach(async ()=> {
        let instructor = await request(server).post('/api/auth/login').send({ username: 'Virginia', password: 'Richmond' })
        await request(server).post('/api/classes').set('authorization', instructor.body.token).send(class1)
    })
    it('add a new class to the database', async () => {
        const classes = await db('classes')
        expect(classes).toHaveLength(2)
    })
})

describe('[PUT] /:id', () => {
    let res
    beforeEach(async ()=> {
        let instructor = await request(server).post('/api/auth/login').send({ username: 'Virginia', password: 'Richmond' })
        res = await request(server).put('/api/classes/1').set('authorization', instructor.body.token).send(class1)
    })
    it('updates the class with the specified id', async () => {
        const updatedClass = await db('classes').where('class_id', 1).first()
        expect(updatedClass).toHaveProperty('class_name', res.body.class_name)
    })
})

describe('[DELETE] /:id', () => {
    beforeEach(async ()=> {
        let instructor = await request(server).post('/api/auth/login').send({ username: 'Virginia', password: 'Richmond' })
        await request(server).delete('/api/classes/1').set('authorization', instructor.body.token)
    })
    it('deletes the class with the specified id from the database', async () => {
        const classes = await db('classes').where('class_id', 1)
        expect(classes).toHaveLength(0)
    })
})

describe('*', () => {
    let res
    it('responds with an error message if incorrect url', async () => {
        res = await request(server).delete('/api/classes')
        expect(res.body.message).toMatch(/not found/i)
    })
})
