'use strict';

function Cell(i, j) {
    this.i = i;
    this.j = j;
    
    this.walls = {
	top: true,
	right: true,
	bottom: true,
	left: true
    };
    
    this.visited = false;
    this.neighbors = {};
    this.dir = '';
}

Cell.prototype.display = function() {
    let x = this.i * length;
    let y = this.j * length;

    if (!this.visited) {
	noStroke();
	fill(31);
	rect(this.i * length, this.j * length, length, length);
    }

    stroke(255);
    if (this.walls.top)    line(x, y, x + length, y); // top
    if (this.walls.right)  line(x + length, y, x + length, y + length); // right
    if (this.walls.bottom) line(x, y + length, x + length, y + length); // bottom
    if (this.walls.left)   line(x, y, x, y + length); // left
};

Cell.prototype.highlight = function() {
    noStroke();
    fill(0, 255, 0, 100);
    rect(this.i * length, this.j * length, length, length);
};

Cell.prototype.getNext = function() {
    let keys = Object.keys(this.neighbors);
    
    let i = Math.floor(Math.random() * keys.length);
    this.dir = keys[i];
    return this.neighbors[keys[i]];
};

Cell.prototype.getNeighbors = function() {
    this.neighbor = {};
    try {
	this.neighbors['top'] = grid[this.j - 1][this.i];
    } catch (err) {}
    try {
	this.neighbors['right'] = grid[this.j][this.i + 1];
    } catch (err) {}
    try {
	this.neighbors['bottom'] = grid[this.j + 1][this.i];
    } catch (err) {}
    try {
	this.neighbors['left'] = grid[this.j][this.i - 1];
    } catch (err) {}

    Object.keys(this.neighbors).forEach((k, i, a) => {
	if (this.neighbors[k] === undefined)
	    delete this.neighbors[k];
    });
};
