const request = require('request');

const urls = process.argv[2];

const batchSize = process.argv[3];

const count = Math.floor(urls / batchSize);


let urlArray = [];
for (let i = 1; i <= urls; i++) {
    urlArray.push(`https://jsonplaceholder.typicode.com/todos/${i}`)
}

let prom = function (url) {

    return new Promise((resolve, reject) => {
        request(url, (err, res) => {
            if (err) { return reject(err) }
            resolve(res);
        });
    });
}

function createBatch(array) {
    let promArray = [];
    for (let i = 0; i < batchSize; i++) {
        promArray[i] = prom(array[i]);
    }

    return Promise.resolve(promArray)
}

function chunkArray(urlArray, batchSize) {
    let results = [];
    let wait = [];
    while (urlArray.length) {
        results.push(urlArray.splice(0, batchSize))
    }

    for (let i = 0; i < count; i++) {
        wait[i] = createBatch(results[i]);
        wait[i].then(response => {
            for(let index in response){
                response[index].then(result=>{
                    console.log(result.body);
                })
            }
        })
    }
}

chunkArray(urlArray, batchSize);