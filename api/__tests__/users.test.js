const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')

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
    beforeEach(async () => {
        let client = await request(server).post('/api/auth/login').send({ username: 'Maine', password: 'Augusta' })
    })
    it.todo('responds with an array of users classes')
})

describe('[POST] /', () => {
    let res
    let client
    beforeEach(async () => {
        client = await request(server).post('/api/auth/login').send({ username: 'Maine', password: 'Augusta' })
        res = await request(server).post('/api/user/').set('authorization', client.body.token).send({ class_id: 1 })
    })
    it('responds with for a class', async () => {
        console.log(res.body)
    })
    it('updates the database with the users class', async () => {
        const usersClassEntry = db('users_classes').where({'user_id': client.id, 'class_id': res.class_id})
        expect(usersClassEntry).toBeTruthy()
    })
})

describe('[PUT] :id/', () => {
    it.todo('update your registered class')
})

describe('[DELETE] /', () => {
    it.todo('un-register for a class')
})
