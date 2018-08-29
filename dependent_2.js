const request = require('request');

const task = ['', 'https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2', 'https://jsonplaceholder.typicode.com/todos/3', 'https://jsonplaceholder.typicode.com/todos/4', 'https://jsonplaceholder.typicode.com/todos/5'];

let resultArray = [];

let finish = function (url) {

    return new Promise((resolve, reject) => {
        request(url, (err, res) => {
            if (err) return reject(err);
            resolve(res);
        });
    });
}


Promise.all([finish(task[1]), finish(task[4])])
    .then(response => {
        resultArray[0] = response[0];
        resultArray[3] = response[1];
    }).then(() => {
        Promise.all([finish(task[2]), finish(task[3]), finish(task[5])])
            .then(response => {
                resultArray[1] = response[0];
                resultArray[2] = response[1];
                resultArray[4] = response[2];
            })
            .then(() => { printResult(); })
    })

function printResult() {
    for (let data of resultArray) {
        console.log(data.body);
    }
}