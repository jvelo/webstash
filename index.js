import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { preview } from './previews.mjs';

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.post('/preview', async (ctx) => {
  const { url } = ctx.request.body;

  if (!url) {
    ctx.status = 400;
    ctx.body = { error: 'URL is required' };
    return;
  }

  try {
    await preview(url);
    ctx.status = 200;
    ctx.body = { message: 'Link preview created successfully' };
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to create link preview' };
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
