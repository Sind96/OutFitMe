const app = require('../index.js');
const Supertest = require('supertest');
const request = Supertest(app.listen());

describe('Index Routes', () => {
    it('GET /test', async () => {
        const response = await request.get('/test');
        expect(response.status).toEqual(200);
    })

    it('GET /getAllItems', async () => {
        const response = await request.get('/getAllItems');
        expect(response.status).toEqual(200);
    })
    
    it('GET /getRandomItem', async () => {
        const response = await request.get('/getRandomItem');
        expect(response.status).toEqual(200);
    })

    // it('POST /upload', async () => {
    //     const response = await request.post('/upload');
    //     expect(response.status).toEqual(200);
    // })
})

