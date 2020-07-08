import { Application } from "https://deno.land/x/oak/mod.ts";

import { connectDatabase } from "./database.ts";
import todoRoutes from "./routes.ts";

const app = new Application();

connectDatabase();

// handling CORS errors
app.use(async (ctx, next) => {
    ctx.response.headers.set('Access-Control-Allow-Origin', '*');
    ctx.response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    ctx.response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    await next();
});

app.use(todoRoutes.routes());
app.use(todoRoutes.allowedMethods());

await app.listen({ port: 8000 });

// to run you need to type
// deno run --allow-read --allow-write --allow-net --allow-plugin --unstable app.ts
// --allow-net because of oak
// --allow-read --allow-write because of the database
// --allow-plugin --unstable because of the third-party package mongo