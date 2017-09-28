'use strict';

const canvasWidth = 600;
const canvasHeight = 600;
const cols = 30;
const rows = 30;
const w = canvasWidth / cols;
const h = canvasHeight / rows;

let grid = create2DArray(cols, rows);
let stack = [];
let start;
let current;
let next;

function preload() {
    for (let i = 0; i < rows; i++) {
	for (let j = 0; j < cols; j++) {
	    grid[j][i]= new Square(i, j);
	}
    }
    for (let i = 0; i < rows; i++) {
	for (let j = 0; j < cols; j++) {
	    grid[j][i].getNeighbors();
	}
    }
    current = start = grid[Math.floor(Math.random() * cols)][Math.floor(Math.random() * rows)];
    current.visited = true;
    stack.push(current);
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
}

function draw() {
    if (stack.length === 0) {
	noLoop();
	console.log('Finished');
    }
    
    background(51);
    for (let i = 0; i < cols; i++) {
	for (let j = 0; j < rows; j++) {
	    grid[i][j].display();
	}
    }

    current.highlight();
    next = current.getNext();
    if (next) {
	next.visited = true;
	stack.push(next);
	removeWalls(current, next);
	current = next;
    } else if (stack.length > 0) {
	current = stack.pop();
    }
}


function removeWalls(current, next) {
    switch (current.dir) {
    case  'top':
	current.walls.top = false;
	next.walls.bottom = false;
	break;
    case 'right':
	current.walls.right = false;
	next.walls.left = false;
	break;
    case 'bottom':
	current.walls.bottom = false;
	next.walls.top = false;
	break;
    case 'left':
	current.walls.left = false;
	next.walls.right = false;
	break;
    };
}

function create2DArray(cols, rows) {
    let grid = new Array(cols);
    for (let i = 0; i < cols; i++) {
	grid[i] = new Array(rows);
    }
    return grid;
}
