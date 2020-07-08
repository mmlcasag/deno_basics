// you dont need to npm install this
// it is not built into deno
// you actually import a remote repository
import { serve } from "https://deno.land/std/http/server.ts";

const server = serve({ port: 3000 });

// server is an async iterable
// so we can iterate it using for
// and since it is async, there is the await
// in practice, this is an infinite loop
// it keeps running, and whenever there's a request
// it executes the code within
for await (const req of server) {
    req.respond({ body: "Hello World\n" });
}

// when trying to run this it crashes because of PermissionDenied
// to make sure that this code works you have to set permission to allow network access
// this permission is "deno run --allow-net app.ts"