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
        res = await request(server).post('/api/auth/register').send({ username: "Virginia", password: "Richmond" })
    })
    it('registers a new user successfully', async () => {
        expect(res.body).toHaveProperty('user_id')
        expect(res.body).toHaveProperty('username')
    })
    it('add the new user to the database', async () => {
        const users = await db('users')
        expect(users).toHaveLength(4)
        const newUser = await db('users').where('user_id', res.body.user_id).first()
        expect(newUser).toHaveProperty('user_id')
        expect(newUser).toHaveProperty('username')
        expect(newUser).toHaveProperty('password')
        expect(newUser).toHaveProperty('role')
    })
    it('registers a new user as an instructor', async () => {
        const res2 = await request(server).post('/api/auth/register').send({ username: "Maryland", password: "Annapolis", role: "instructor" })
        const newInstructor = await db('users').where('user_id', res2.body.user_id).first()
        expect(newInstructor.role).toMatch(/instructor/i)
    })
    describe('Error messages on invalid attempts', () => {
        it('responds with error message on duplicate usernames', async () => {
            res = await request(server).post('/api/auth/register').send({ username: "Virginia", password: "Richmond" })
            expect(res.body.message).toMatch(/username is taken/i)
        })
        it('responds with error message when username less the 3 characters or password less than 5', async () => {
            res = await request(server).post('/api/auth/register').send({ username: "Vi", password: "Richmond" })
            expect(res.body.message).toMatch(/Username must be at least 3 characters long./i)
            res = await request(server).post('/api/auth/register').send({ username: "Virginia", password: "Rich" })
            expect(res.body.message).toMatch(/Password must be at least 5 characters long./i)
        })
        it('responds with error message when empty string for username or password', async () => {
            res = await request(server).post('/api/auth/register').send({ username: "", password: "Richmond" })
            expect(res.body.message).toMatch(/You must enter a username/i)
            res = await request(server).post('/api/auth/register').send({ username: "Virginia", password: "" })
            expect(res.body.message).toMatch(/You must enter a password/i)
        })
        it('responds with error message when non-string values for username or password', async () => {
            res = await request(server).post('/api/auth/register').send({ username: [''], password: "Richmond" })
            expect(res.body.message).toMatch(/Username must be a string/i)
            res = await request(server).post('/api/auth/register').send({ username: "Virginia", password: [''] })
            expect(res.body.message).toMatch(/Password must be a string/i)
        })
    })
})

describe('[POST] /login', ()=> {
    let res
    beforeEach(async () => {
        await request(server).post('/api/auth/register').send({ username: "Virginia", password: "Richmond" })
        res = await request(server).post('/api/auth/login').send({ username: "Virginia", password: "Richmond" })
    })
    it('allows a user to login with valid credentials', () => {
        expect(res.body.message).toMatch(`Hello ${res.body.user.username}`)
    })
    it('user receives a auth token', () => {
        expect(res.body).toHaveProperty('token')
    })
})
