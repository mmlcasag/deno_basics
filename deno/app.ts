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