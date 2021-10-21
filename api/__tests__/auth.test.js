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

describe('[POST] /register', ()=> {
    let res
    beforeEach(async () => {
        res = await request(server)
        .post('/api/auth/register')
        .send({ username: "Virginia", password: "Richmond" })
    })
    it('registers a new user successfully', async () => {
        expect(res.body).toHaveProperty('user_id')
        expect(res.body).toHaveProperty('username')
    })
    it('add the new user to the database', async () => {
        const users = await db('users')
        expect(users).toHaveLength(4)
    })
    describe('error messages on invalid attempts', () => {
        it.todo('rejects duplicate usernames')
        it.todo('rejects username less the 3 characters or password less than 5')
        it.todo('rejects empty string for username or password')
        it.todo('rejects non-string values for username or password')
    })
})

describe('[POST] /login', ()=> {
    it.todo('')
})
