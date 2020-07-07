const fs = require('fs').promises;

const text = 'This is a text - and it should be stored in a file';

fs.writeFile('nodefile.txt', text)
    .then(result => {
        console.log('Wrote successfully to the file');
    })
    .catch(err => {
        console.log(err);
    });