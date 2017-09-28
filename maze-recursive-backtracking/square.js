'use strict';

function Square(i, j) {
    this.i = i;
    this.j = j;
    this.walls = { top: true, right: true, bottom: true, left: true };
    this.neighbors = {};
    this.visited = false;
    this.dir = '';
}

Square.prototype.display = function() {
    let x = this.i * w;
    let y = this.j * h;

    stroke(255);
    if (this.walls.top)    line(x    , y    , x + w, y    ); // top
    if (this.walls.right)  line(x + w, y    , x + w, y + h); // right
    if (this.walls.bottom) line(x    , y + h, x + w, y + h); // bottom
    if (this.walls.left)   line(x    , y    , x    , y + h); // left

    if (this.visited) {
	noStroke();
	fill(51, 51, 51, 100);
	rect(x, y, w, h);
    }
};

Square.prototype.highlight = function() {
    noStroke();
    fill(0, 255, 0, 100);
    rect(this.i * w, this.j * h, w, h);
};

Square.prototype.getNext = function() {
    let keys = Object.keys(this.neighbors);
    keys = keys.filter((k, i, a) => { 
	if (!this.neighbors[k].visited) return true;
    });
    
    if (keys.length > 0) {
	let i = Math.floor(Math.random() * keys.length);
	this.dir = keys[i];
	return this.neighbors[keys[i]];
    }
    return undefined;
};

Square.prototype.getNeighbors = function() {
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
