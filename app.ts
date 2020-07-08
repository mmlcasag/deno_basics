// using oak
// oak is deno's equivalent to node's express

import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

// in oak we have req and res inside this ctx object
app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });

// to run we have to type
// deno run --allow-net app.ts