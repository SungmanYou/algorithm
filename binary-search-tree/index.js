'use strict';

let tree = new Tree();

for (let i = 0; i < 20; i++) {
    tree.addValue(rand(0, 100));
}


tree.traverse();
let result = tree.search(10);
console.log(result);


function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
