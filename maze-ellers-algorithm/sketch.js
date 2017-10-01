'use strict';

const canvasWidth = 600;
const canvasHeight = 600;
const length = 10;
const w = canvasWidth / length;
const h = canvasHeight / length;


let grid = new Array();
let sets = [];
let row = 0;
function setup() {
    createCanvas(canvasWidth, canvasHeight);
    initFirstRow();
    row++;
}

function draw() {

    if (row >= length) {
	lastRow();
	
	background(51);
	for (let j = 0; j < grid.length; j++) {
    	    for (let i = 0; i < grid[j].length; i++) {
    		grid[j][i].display();
    	    }
	}
	noLoop();
	return;
    }

    copyPreviousRow();
    removeRightWalls();
    removeSets();
    removeBottomWalls();
    uniqueSet();
    randomMerge();
    randomBottom();
    row++;

    background(51);
    for (let j = 0; j < grid.length; j++) {
    	for (let i = 0; i < grid[j].length; i++) {
    	    grid[j][i].display();
    	}
    }
}

function initFirstRow() {

    let newRow = new Array();
    for (let i = 0; i < length; i++) {
	let cell = new Cell(i, row);
	cell.set = cell.rand();
	newRow.push(cell);
    }

    for (let i = 0; i < newRow.length - 1; i++) {
	let leftCell = newRow[i];
	let rightCell = newRow[i + 1];
	if (Math.random() < 0.5) {
	    let i = sets.indexOf(rightCell.set);
	    sets.splice(i, 1);
	    leftCell.right = false;
	}
    }
    
    for (let i = 0; i <newRow.length - 1; i++) {
    	let leftCell = newRow[i];
    	let rightCell = newRow[i + 1];
    	if (leftCell.right === false && leftCell.set !== rightCell.set) {
    	    rightCell.set = leftCell.set;
    	}
    }

    let arr = {};
    for (let i = 0; i < newRow.length; i++) {
	if (!arr[newRow[i].set]) {
	    arr[newRow[i].set] = [newRow[i]];
	} else {
	    arr[newRow[i].set].push(newRow[i]);
	}
	newRow[i].bottom = true;
    }
    arr = Object.values(arr);
    
    for (let i = 0; i < arr.length; i++) {
    	let rand = Math.floor(Math.random() * arr[i].length);
    	arr[i][rand].bottom = false;
    }

    grid.push(newRow);
}

function copyPreviousRow() {
    let prevRow = grid[row - 1];
    let newRow = new Array();
    for (let i = 0; i < prevRow.length; i++)  {
	let cell = new Cell(i, row);
	cell.set = prevRow[i].set;
	cell.right = prevRow[i].right;
	cell.bottom = prevRow[i].bottom;
	newRow.push(cell);
    }
    grid.push(newRow);
}

function removeRightWalls() {
    let currentRow = grid[row];
    for (let i = 0; i < currentRow.length - 1; i++) {
	currentRow[i].right = false;
    } 
}

function removeSets() {
    let currentRow = grid[row];
    for (let i = 0; i < currentRow.length; i++) {
	if (currentRow[i].bottom === true) {
	    let count = 0;
	    for (let j = 0; j < grid.length; j++) {
		for (let k = 0; k < grid[j].length; k++) {
		    if (grid[j][k].set === currentRow[i].set) count++;
		}
	    }
	    if (count <= 1) {
		let i = sets.indexOf(currentRow[i].set);
		sets.splice(i, 1);
	    }
	    currentRow[i].set = null;
	}
    } 
}

function removeBottomWalls() {
    let currentRow = grid[row];
    for (let i = 0; i < currentRow.length; i++) {
	currentRow[i].bottom = false;
    } 
}

function uniqueSet() {
    let currentRow = grid[row];
    for (let i = 0; i < currentRow.length; i++) {
	if (currentRow[i].set === null) {
	    currentRow[i].set = currentRow[i].rand();
	}
    }     
}

function randomMerge() {
    let currentRow = grid[row];
    
    for (let i = 0; i < currentRow.length - 1; i++) {
	let leftCell = currentRow[i];
	let rightCell = currentRow[i + 1];
	
	if (leftCell.set === rightCell.set) {
	    leftCell.right = true;
	}
	
	if (leftCell.set !== rightCell.set) {
	    leftCell.right = true;
	    if (Math.random() < 0.5) {
		let count = 0;
		for (let j = 0; j < grid.length; j++) {
		    for (let i = 0; i < grid[j].length; i++) {
			if (grid[j][i].set === rightCell.set) count++;
		    }
		}
		if (count <= 1) {
		    let i = sets.indexOf(rightCell.set);
		    sets.splice(i, 1);
		}
		leftCell.right = false;
	    }
	}
    }

    for (let i = 0; i <currentRow.length - 1; i++) {
	let leftCell = currentRow[i];
	let rightCell = currentRow[i + 1];
	if (leftCell.right === false && leftCell.set !== rightCell.set) {
	    rightCell.set = leftCell.set;
	}
    }
}

function randomBottom() {
    let arr = {};
    let currentRow = grid[row];
    
    for (let i = 0; i < currentRow.length; i++) {
	if (!arr[currentRow[i].set]) {
	    arr[currentRow[i].set] = [currentRow[i]];
	} else {
	    arr[currentRow[i].set].push(currentRow[i]);
	}
	currentRow[i].bottom = true;
    }
    arr = Object.values(arr);
    
    for (let i = 0; i < arr.length; i++) {
        let rand = Math.floor(Math.random() * arr[i].length);
    	arr[i][rand].bottom = false;
    }
}

function lastRow() {
    let currentRow = grid[row - 1];
    for (let i = 0; i < currentRow.length - 1; i++) {
	let leftCell = currentRow[i];
	let rightCell = currentRow[i + 1];

	leftCell.bottom = true;
	rightCell.bottom = true;
	
	if (leftCell.set !== rightCell.set) {
	    leftCell.right = false;
	    rightCell.set = leftCell.set;
	}
    }
}
