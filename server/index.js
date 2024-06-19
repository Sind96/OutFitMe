'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const dotenv = require('dotenv');
dotenv.config();

const app = new Koa();

const authRouter = require('./routes/auth.route');
const router = require('./routes/images.route');


app.use(cors());
app.use(bodyParser());

app.use(authRouter.routes());
// app.use(authRouter.allowedMethods());
app.use(router.routes());
app.use(router.allowedMethods());



app.use(async (ctx, next) => {
  await next();

  if (ctx.status === 404) {
    ctx.body = 'Sorry, this route does not exist!';
  }
});

app.use(async (ctx) => {
  ctx.body = 'This will eventually be an app.';
});

module.exports = app;