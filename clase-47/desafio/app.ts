import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { Handlebars } from 'https://deno.land/x/handlebars/mod.ts';

const app = new Application();
const router = new Router();
const handle = new Handlebars({});
const colors: string[] = [];

const PORT = 8080;

router.get("/", async (ctx: any) => {
  const view = await handle.renderView('index');
  ctx.response.headers.set("content-type", "text/html");
  ctx.response.body = view;
});

router.post("/colores", async (ctx: any) => {
  const body = await ctx.request.body().value;
  if(body.color){
    colors.push(body.color)
    ctx.response.headers.set("Content-Type", "application/json");
    ctx.response.body = colors;
    ctx.response.status = 200;
  }else{
    ctx.response.status = 404;
  }
});

router.get("/colores",  (ctx: any) => {
  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.body = colors;
  ctx.response.status = 200;
});

app.use(router.allowedMethods());
app.use(router.routes());

await app.listen({ port: PORT, hostname: "127.0.0.1" });