'use strict';

const canvasWidth = 400;
const canvasHeight = 400;
const cols = 10;
const rows = 10;
const rectWidth = canvasWidth / cols;
const rectHeight = canvasHeight / rows;

let grid = create2DArray(cols, rows);
let start = grid[0][0];  // Top left
let end = grid[cols - 1][rows - 1]; // Bottom right
let path = [];

let openSet = [start];
let closedSet = [];

function setup() {
    createCanvas(400, 400);
    console.log(grid);
}

function draw() {
    if (openSet.length > 0) { // Keep searching
	
	let lowestI = 0;
	for (let i = openSet.length - 1; i >= 0; i--) {
	    if (openSet[i].f < openSet[lowestI].f)
		lowestI = i;
	}
	
	let current = openSet[lowestI];
	if (current === end) {
	    // Find the path
	    let t = current;
	    path.push(t);
	    while(t.prev) {
		path.push(t.prev);
		t = t.prev;
	    }
	    
	    noLoop();
	    console.log('Done!');
	}

	removeFromArray(openSet, current);
	closedSet.push(current);

	current.neighbors.forEach((neighbor, i , arr) => {
	    if (closedSet.includes(neighbor)) return;
	    
	    let tempG = current.g + 1;
	    if (openSet.includes(neighbor)) {
		if (tempG < neighbor.g) neighbor.g = tempG;
	    } else {
		neighbor.g = tempG;
		openSet.push(neighbor);
	    }

	    neighbor.h = heuristic(neighbor, end);
	    neighbor.f = neighbor.g + neighbor.h;
	    neighbor.prev = current;
	});
	
	
    } else { // No solution
	
    }
    
    background(0);

    // Display grid
    for (let i = 0; i < cols; i++) {
	for (let j = 0; j < rows; j++) {
	    grid[i][j].show(color(255));
	}
    }

    // Display closed set
    for (let i = 0; i < closedSet.length; i++) {
	closedSet[i].show(color(255, 0, 0));
    }

    // Display open set
    for (let i = 0; i < openSet.length; i++) {
	openSet[i].show(color(0, 255, 0));
    }

    // Display path
    for (let i = 0; i < path.length; i++) {
	path[i].show(color(0, 0, 255));
    }
}
