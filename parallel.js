const request = require('request');
const urls = ['https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2', 'https://jsonplaceholder.typicode.com/todos/3'];

let pArray = []
let p = function (url) {

    return new Promise((resolve, reject) => {
        request(url, (err, res) => {
            if (err) { return reject(err) }
            resolve(res);
        });
    });
}

for (let index in urls) {
    pArray[index] = p(urls[index]);
}

//const obj = [pArray[0], pArray[1], pArray[2]]

Promise.all(pArray).then(res => {
    for (let index in res) {
        console.log(`${res[index].body} url no ${+index + 1}`);
    }
});