const request = require('request');

const task = ['', 'https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2', 'https://jsonplaceholder.typicode.com/todos/3', 'https://jsonplaceholder.typicode.com/todos/4', 'https://jsonplaceholder.typicode.com/todos/5'];

let resultArray = [];
let count = 0;

let finish = function (url) {

    return new Promise((resolve, reject) => {
        request(url, (err, res) => {
            if (err) return reject(err);
            count++;
            resolve(res);
        });
    });
}


//independent task 4 .. task 5 completes after task 4
finish(task[4])
    .then(response => {
        resultArray[4] = response.body;
    })
    .then(() => {
        finish(task[5])
            .then(response => {
                resultArray[5] = response.body;
                if (count == task.length - 1)
                    return printResult();
            })
    })

//independent task 1 .. task 2 & 3 are completed after task 1
finish(task[1])
    .then(response => {
        resultArray[1] = response.body;
    })
    .then(() => {
        Promise.all([finish(task[2]), finish(task[3])])
            .then(response => {
                for (let index in response) {
                    resultArray[+index + 2] = response[index].body
                }
                if (count == task.length - 1)
                    return printResult();
            })
    })

function printResult() {
    resultArray.shift();
    for (let data of resultArray) {
        console.log(data);
    }
}