const Koa = require('koa');
const app = require('./index'); //Double check if this is correct
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const { PORT } = require('./config');
const router = require('./router');

const Supertest = require('supertest');
const request = require(app);

