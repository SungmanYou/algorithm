'use strict';

const canvasWidth = 600;
const canvasHeight = 600;
const cols = 25;
const rows = 25;
const w = canvasWidth / cols;
const h = canvasHeight / rows;

let grid = create2DArray();
let sets = {};
let currentCell;
let neighbor;
let dir = null;

function preload() {

    // initialize the grid
    for (let j = 0; j < grid.length; j++) {
    	for (let i = 0; i < grid[j].length; i++) {
	    let cell = new Cell(i, j);
    	    grid[j][i] = cell;
	    
	    if (sets[cell.set]) {
		sets[cell.set].push(cell);
	    } else {
		sets[cell.set] = [cell];
	    }
	}
    }

    for (let j = 0; j < grid.length; j++) {
    	for (let i = 0; i < grid[j].length; i++) {
    	    grid[j][i].getNeighbors();
    	}
    }
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
}

function draw() {

    currentCell = selectRandomCell();
    neighbor = selectRandomNeighbor();
    
    if (currentCell && neighbor) {
    	merge();
	
	background(51);
	for (let j = 0; j < grid.length; j++) {
	    for (let i = 0; i < grid[j].length; i++) {
		grid[j][i].display();
	    }
	}
    }
    
    if (checkFinish()) {
	console.log(grid);
	noLoop();
	return;
    }
}

function selectRandomCell() {
    let i = Math.floor(Math.random() * cols);
    let j = Math.floor(Math.random() * rows);
    return grid[j][i];
}

function selectRandomNeighbor() {
    let dirs = Object.keys(currentCell.neighbors);

    for (let i = 0; i < dirs.length; i++) {
	if (currentCell.walls[dirs[i]] === false) {
	    dirs.splice(i ,1); i--;
	}
    }

    if (dirs.length > 0) {
	dir = dirs[Math.floor(Math.random() * dirs.length)];
	let selected = currentCell.neighbors[dir];
	if (currentCell.set !== selected.set) {
	    return selected;
	}
    }

    return null;
}

function merge() {
    let cSet = currentCell.set;
    let nSet = neighbor.set;

    switch (dir) {
    case 'top':
	currentCell.walls.top = false;
	neighbor.walls.bottom = false;
	break;
    case 'right':
	currentCell.walls.right = false;
	neighbor.walls.left = false;
	break;
    case 'bottom':
	currentCell.walls.bottom = false;
	neighbor.walls.top = false;
	break;
    case 'left':
	currentCell.walls.left = false;
	neighbor.walls.right = false;
	break;
    };

    for (let i = 0; i < sets[nSet].length; i++) {
	sets[nSet][i].set = cSet;
	sets[cSet].push(sets[nSet][i]);
	sets[nSet].splice(i, 1);
	i--;
    }
    
    delete sets[nSet];
}

function create2DArray() {
    let g = new Array(rows);
    for (let i = 0; i < g.length; i++) {
	g[i] = new Array(cols);
    }
    return g;
}

function checkFinish() {
    let keys = Object.keys(sets);
    if (keys.length <= 1) {
	return true;
    } else {
	return false;
    }
}
