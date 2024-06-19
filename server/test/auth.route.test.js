const app = require('../index.js');
const Supertest = require('supertest');
const request = Supertest(app.listen());
const { verifyToken } = require('../utils/authUser');
const mongoose = require('mongoose');
const users = require('../models/user.models.js');

beforeAll(async () => {
    await users.deleteMany()
})

afterAll(async () => {
    await users.deleteMany()
})

describe('Auth Route Testing', () => {
    it('POST /register', async () => {
        const payload = {
            username: "test",
            email: "test@email.com",
            password: "test"
        };
        const response = await request
                        .post('/register')
                        .send(payload)
                        .set('Content-Type', 'application/json')
                        .set('Accept', 'application/json');
        expect(response.status).toBe(201);
    })

    it('POST /login', async () => {
        const payload = {
            username: "test",
            password: "test"
        }

        const response = await request
                        .post('/login')
                        .send(payload)
                        .set('Content-Type', 'application/json')
                        .set('Accept', 'application/json');
        expect(response.status).toBe(200)
        expect(response.body.message).toBe("Login successful");
                        
    })

    // it('GET /profile', async () => {
    //     const response = await request.get('/profile')
    //     expect(response.status).toBe(200)
    // })

    it('GET /logout', async () => {
        const response = await request.get('/logout')
        expect(response.status).toBe(200)
    })
})