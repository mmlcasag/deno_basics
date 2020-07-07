// let message: string;
// message = 'Hi there!';
// console.log(message);
// deno run app.ts

const text = 'This is a text - and it should be stored in a file';

// Important: Download VS Code Deno extension!!!

const encoder = new TextEncoder();
const data = encoder.encode(text);

Deno.writeFile('message.txt', data)
    .then(result => {
        console.log('Wrote to file successfully');
    })
    .catch(err => {
        console.log(err);
    });