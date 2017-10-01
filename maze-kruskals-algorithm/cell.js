'use strict';

function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = { top: true, right: true, bottom: true, left: true };
    this.neighbors = {};
    this.set = this.rand();
}

Cell.prototype.display = function() {
    let x = this.i * w;
    let y = this.j * h;

    stroke(255);
    if (this.walls.top)    line(x    , y    , x + w, y    ); // top
    if (this.walls.right)  line(x + w, y    , x + w, y + h); // right
    if (this.walls.bottom) line(x    , y + h, x + w, y + h); // bottom
    if (this.walls.left)   line(x    , y    , x    , y + h); // left
};

Cell.prototype.rand = function() {
    while (true) {
	let keys = Object.keys(sets);
	let n = Math.floor(Math.random() * cols * rows) + 1;
	if (!keys.includes(n.toString())) {
	    return n;
	}
    }  
};

Cell.prototype.getNeighbors = function() {
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
