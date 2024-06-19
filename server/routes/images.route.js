'use strict';

const Router = require('@koa/router');
const router = new Router();
const image = require('../controllers/image.controllers');

//MVP routes
router.post('/upload', image.postImage);
router.get('/getRandomItem/:item/:tempToday/:rainToday', image.getRandomItem);
router.get('/getAllItems/:item', image.getAllItems);
router.get('/test', async (ctx) => {
    try {
        ctx.status = 200;
    } catch (err) {
        ctx.status = 500;
        console.log(err);
    }
})

module.exports = router;
