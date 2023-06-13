const Koa = require('koa');
// const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { PrismaClient } = require('@prisma/client');
const router =require ('./src/routes/web.js');

const prisma = new PrismaClient();
const app = new Koa();
// const router = new Router();

app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

prisma.$connect();
console.log('Connected to the database');

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
