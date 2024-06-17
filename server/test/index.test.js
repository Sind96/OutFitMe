const Koa = require('koa');
const app = require('../index'); //Double check if this is correct
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const { PORT } = require('./utils/config');
const router = require('./routes/images.route');

const Supertest = require('supertest');
const request = require(app);

