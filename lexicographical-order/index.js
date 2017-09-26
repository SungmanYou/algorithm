'use strict';

let array = randomPick({
    range: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    length: 4
});

while (array != null) {
    console.log(array);
    array = lexicographicalOrder(array);
}

function lexicographicalOrder(array) {

    // Lexicographical order algorithm

    // STEP 1 : Find the largest i such that array[i] < array[i + 1]
    let largestI = -1;
    for (let i = 0; i < array.length - 1; i++) {
	if (array[i] < array[i + 1]) largestI = i;
    }

    // If there is no such i, array is the last permutation
    if (largestI === -1) {
	console.log("finished");
	return null;
    }

    // STEP 2 : Find the largest j such that array[j] < array[largestI]
    let largestJ = -1;
    for (let j = 0; j < array.length; j++) {
	if (array[largestI] < array[j]) largestJ = j;
    }

    // STEP 3 : Swap array[largestI] & array[largestJ]
    swap(array, largestI, largestJ);

    // STEP 4 : Reverse from LargestI + 1 to the end
    let endArray = array.splice(largestI + 1);
    endArray.reverse();
    return array.concat(endArray);
}


function randomPick(params) {
    let array = [];
    let length = params.range.length;
    for (let i = 0; i < params.length; i++) {
	let j = Math.floor(Math.random() * length);
	array.push(params.range[j]);
	params.range.splice(j, 1);
	length--;
    }
    return array.sort();
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
