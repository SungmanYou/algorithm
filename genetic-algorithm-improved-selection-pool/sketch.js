'use strict';

let sample = [
    { name: 'mango', score: 19, counts: 0 },
    { name: 'orange', score: 21, counts: 0 },
    { name: 'apple', score: 5, counts: 0 },
    { name: 'banana', score: 10, counts: 0 },
    { name: 'cherry', score: 52, counts: 0 },
    { name: 'raspberry', score: 22, counts: 0 },
    { name: 'blueberry', score: 3, counts: 0 }
];


let total = 0;
for (let i = 0; i < sample.length; i++) {
    total += sample[i].score;
}


for (let i = 0; i < sample.length; i++) {
    sample[i]['prob'] = sample[i].score / total;
}



for (let i = 0; i < 1000; i++) {
    let index = 0;
    let rand = Math.random();

    while (rand > 0) {
	rand = rand - sample[index].prob;
	index++;
    }
    index--;
    sample[index].counts++;
}

console.log(sample);
