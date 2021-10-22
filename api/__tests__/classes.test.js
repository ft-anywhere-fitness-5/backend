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
    let res
    beforeEach(async ()=> {
        res = await request(server).post('/api/classes').send(class1)
    })
    it('add a new class to the database', async () => {
        const classes = await db('classes')
        expect(classes).toHaveLength(2)
    })
})

describe('[PUT] /:id', () => {
    let res
    beforeEach(async ()=> {
        res = await request(server).put('/api/classes/1').send(class1)
    })
    it('updates the class with the specified id', async () => {
        const updatedClass = await db('classes').where('class_id', 1).first()
        console.log(updatedClass)
    })
})

describe('[DELETE] /:id', () => {
    let res
    it('deletes the class with the specified id', async () => {
        
    })
})

describe('*', () => {
    let res
    it('responds with a message if endpoint not found', async () => {
        
    })
})
