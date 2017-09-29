'use strict';

const canvasWidth = 500;
const canvasHeight = 500;
const length = 5;
const w = canvasWidth / length;
const h = canvasHeight / length;

let row = 0;
let grid = new Array();
let sets = [];

function preload() {}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    grid.push(newArray());

}

function draw() {
    background(51);

    mergeArray();
    openBottom();
    row++;
    grid.push(newArray());
    expandBottom();
    checkLast();

    for (let i = 0; i < grid.length; i++) {
	for (let j = 0; j < grid[i].length; j++) {
	    grid[i][j].display();
	}
    }
}

function newArray() {
    let array = new Array();
    
    if (row === 0) {
	for (let i = 0; i < length; i++) {
	    array.push(new Square({
		set: getMissingSet(),
		x: i,
		y: row
	    }));
	}
	return array;
    }

    else {
	for (let i = 0; i < length; i++) {
	    array.push(new Square({
		set: undefined,
		x: i,
		y: row
	    }));
	}
	return array;
    }
}


function getMissingSet() {
    while (true) {
	let rand = Math.floor(Math.random() * length * length) + 1;
	if (!sets.includes(rand)) {
	    sets.push(rand);
	    return rand;
	}
    }
}

function mergeArray() {
    let current = grid[row];
    for (let i = 0; i < current.length - 1; i++) {
	if (current[i].set !== current[i + 1].set) {
	    if (Math.random() < 0.5) {
		current[i].walls.right = false;
		current[i + 1].walls.left = false;
		for (let j = 0; j < sets.length; j++) {
		    if (sets[j] === current[i + 1].set) {
			let count = 0;
			for (let k = 0; k < grid.length; k++) {
			    for (let l = 0; l < grid[k].length; l++) {
				if (grid[k][l].set === current[i + 1].set)
				    count++;
			    }
			}
			if (count === 1) sets.splice(j, 1);
		    }
		}
		current[i + 1].set = current[i].set;
	    }
	}
    }
}

function openBottom() {
    let arr = {};
    let current = grid[row];

    for (let i = 0; i < current.length; i++) {
	if (!arr[current[i].set]) {
	    arr[current[i].set] = [current[i]];
	} else {
	    arr[current[i].set].push(current[i]);
	}	
    }
    // JSON to Array
    arr = Object.values(arr);
    
    for (let i = 0; i < arr.length; i++) {
    	let opened = [];
    	for (let j = 0; j < arr[i].length; j++) {
    	    if (Math.random() < 0.5) {
    		arr[i][j].walls.bottom = false;
    	    }
    	    opened.push(arr[i][j].walls.bottom);
    	}
    	if (!opened.includes(false)) {
    	    let rand = Math.floor(Math.random() * arr[i].length);
    	    arr[i][rand].walls.bottom = false;
    	}
    }
}

function expandBottom() {
    let prev = grid[row - 1];
    let current = grid[row];
    for (let i = 0; i < prev.length; i++) {
	if (!prev[i].walls.bottom) {
	    current[i].walls.top = false;
	    current[i].set = prev[i].set;
	}
    }
    for (let i = 0; i < current.length; i++) {
	if (!current[i].set) {
	    current[i].set = getMissingSet();
	}
    }
}

function checkLast() {
    if (row === length - 1) {
	let current = grid[row];
	for (let i = 0; i < current.length - 1; i++) {
	    if (current[i].set !== current[i + 1].set) {
		if (!Object.values(current[i].walls).includes(false) ||
		    !Object.values(current[i + 1].walls).includes(false)) {
		    current[i].walls.right = false;
		    current[i + 1].walls.left = false;
		    current[i + 1].set = current[i].set;
		}
	    }    
	}

	for (let i = 0; i < grid.length; i++) {
	    for (let j = 0; j < grid[i].length; j++) {
		grid[i][j].display();
	    }
	}

	noLoop();
    }
}













