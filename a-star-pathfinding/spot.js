'use strict';

function Spot(i, j) {
    this.col = i;
    this.row = j;
    this.f = 0;
    this.cost = 0;
    this.heuristic = 0;
    this.neighbors = [];
    this.prev = undefined;
    this.obstacle = (Math.random() < density / 100) ? true : false;
}

Spot.prototype.show = function(color) {
    if (this.obstacle) {
	noStroke();
	fill(69, 69, 69);
    } else {
	noStroke();
	fill(color);
    }
    ellipse(this.col * w + w / 2, this.row * h + h / 2, w / 1.5, h / 1.5);
};

Spot.prototype.addNeighbors = function(grid) {
    // top left
    if (this.col > 0 && this.row > 0)
	this.neighbors.push(grid[this.col - 1][this.row - 1]);
    // top
    if (this.row > 0)
	this.neighbors.push(grid[this.col][this.row - 1]);
    // top right
    if (this.col < cols - 1 && this.row > 0)
	this.neighbors.push(grid[this.col + 1][this.row - 1]);
    // right
    if (this.col < cols - 1)
	this.neighbors.push(grid[this.col + 1][this.row]);
    // right bottom
    if (this.col < cols - 1 && this.row < rows - 1)
	this.neighbors.push(grid[this.col + 1][this.row + 1]);
    // bottom
    if (this.row < rows - 1)
	this.neighbors.push(grid[this.col][this.row + 1]);
    // left bottom
    if (this.col > 0 && this.row < rows - 1)
	this.neighbors.push(grid[this.col - 1][this.row + 1]);
    // left
    if (this.col > 0)
	this.neighbors.push(grid[this.col - 1][this.row]);
};
