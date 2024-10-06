const Koa = require('koa');
const app = new Koa();

const {
  POSTGRES_HOST
} = process.env;

console.log('POSTGRES_HOST', POSTGRES_HOST);

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
