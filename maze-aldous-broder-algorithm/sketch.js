'use strict';

const canvasWidth = 600;
const canvasHeight = 600;
const length = 50;
const columns = canvasWidth / length;
const rows = canvasHeight / length;

let grid = create2DArray(columns, rows);
let current;
let next;

function preload() {
    for (let i = 0; i < rows; i++) {
	for (let j = 0; j < columns; j++) {
	    grid[j][i]= new Cell(i, j);
	}
    }
    
    for (let i = 0; i < rows; i++) {
	for (let j = 0; j < columns; j++) {
	    grid[j][i].getNeighbors();
	}
    }
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    current = grid[Math.floor(Math.random() * columns)][Math.floor(Math.random() * rows)];
    current.visited = true;
}

function draw() {
    background(51);
    for (let i = 0; i < columns; i++) {
	for (let j = 0; j < rows; j++) {
	    grid[i][j].display();
	}
    }

    if (checkDone()) {
	noLoop();
	return;
    }
    
    current.highlight();
    
    next = current.getNext();
    if (!next.visited) {
	next.visited = true;
	removeWalls(current, next);
    }
    current = next;
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

function checkDone() {
    let done =  true;
    for (let i = 0; i < rows; i++) {
	for (let j = 0; j < columns; j++) {
	    if (!grid[j][i].visited) done = false;
	}
    }
    return done;
}
