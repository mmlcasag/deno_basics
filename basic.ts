// let message: string;
// message = 'Hi there!';
// console.log(message);
// deno run app.ts

const text = 'This is a text - and it should be stored in a file';

// Important: Download VS Code Deno extension!!!

const encoder = new TextEncoder();
const data = encoder.encode(text);

Deno.writeFile('denofile.txt', data)
    .then(result => {
        console.log('Wrote successfully to the file');
    })
    .catch(err => {
        console.log(err);
    });

// if you try to run this code using "deno run app.ts" you will get a permission error
// this happens because node is secure by default
// this means you need permission to read or write files, for example
// and how to give permission to write files?
// "deno run --allow-write app.ts" --> this gives permission to write any file
// "deno run --allow-read app.ts --> this gives permission to read any file
// "deno run --allow-write=denofile.txt app.ts --> this gives permission to write just denofile.txt file
// so, now i will run "deno run --allow-write=denofile.txt app.ts" and it will work!