const request = require('request');

const urls = ['https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2', 'https://jsonplaceholder.typicode.com/todos/3'];


let result = [];
let count = 0;

let p = function (url) {

    return new Promise((resolve, reject) => {
        request(url, (err, res) => {
            if (err) { return reject(err) }
            resolve(res);
        });
    });
}

p(urls[0])
.then(response => {
    console.log(response.body);
    return p(urls[1]);
}).then(response => {
    console.log(response.body);
    return p(urls[2]);
}).then(response => {
    console.log(response.body);
});


// p(urls[0])
//     .then(response => console.log(`${response.body} first url`))
//     .then(() => {
//         p(urls[1])
//             .then(response => console.log(`${response.body} second url`))
//             .then(() => {
//                 p(urls[2])
//                 .then(response => console.log(`${response.body} third url`))
//             })
//     })