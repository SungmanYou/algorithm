'use strict';

function Spot(i, j) {
    this.i = i;
    this.j = j;
    
    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.neighbors = [];
    this.prev = undefined;
}

Spot.prototype.show = function(color) {
    fill(color); noStroke();
    rect(this.i * rectWidth, this.j * rectHeight, rectWidth, rectHeight);
};

Spot.prototype.addNeighbors = function(grid) {
    if (this.i < cols - 1)
	this.neighbors.push(grid[this.i + 1][this.j]);
    if (this.i > 0)
	this.neighbors.push(grid[this.i - 1][this.j]);
    if (this.j < rows - 1)
	this.neighbors.push(grid[this.i][this.j + 1]);
    if (this.j > 0)
	this.neighbors.push(grid[this.i][this.j - 1]);
};


function create2DArray(cols, rows) {
    let grid = new Array(cols);
    for (let i = 0; i < cols; i++) {
	grid[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
	for (let j = 0; j < rows; j++) {
	    grid[i][j] = new Spot(i, j);
	}
    }

    for (let i = 0; i < cols; i++) {
	for (let j = 0; j < rows; j++) {
	    grid[i][j].addNeighbors(grid);
	}
    }
    return grid;
}


function removeFromArray(array, elem) {
    for (let i = array.length - 1; i >= 0; i--) {
	if (array[i] === elem) {
	    array.splice(i, 1);
	}
    }
}

function heuristic(x, y) {
    // return dist(x.i, x.j, y.i, y.j);
    return abs(x.i - y.i) +  abs(x.j - y.j);
}
