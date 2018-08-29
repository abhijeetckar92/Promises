const request = require('request');

let prom = function (url) {
    return new Promise((resolve, reject) => {
        request(url, (err, res) => {
            if (err) { return reject(err) }
            resolve(res);
        });
    });
}

let arr = [['https://jsonplaceholder.typicode.com/todos/1'], ['https://jsonplaceholder.typicode.com/todos/2']];

let ep = Promise.resolve();

for(let url of arr){
    ep = ep.then(res => {
            if(res){
                console.log(res.body);
            }

            let promiseArr = [];
            promiseArr.push(prom(x[0]));

            return Promise.all(promiseArr);
        });
}

ep.then(res => {
    console.log(res.body);
})