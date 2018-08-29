let arr = ['Every', 'good', 'boy', 'does', 'fine'];

// "Every good boy does fine"

let result = "";

for(let index of arr){
    result += `${index} `;
}

console.log(result);