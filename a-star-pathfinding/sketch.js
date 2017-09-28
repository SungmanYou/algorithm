'use strict';

const canvasWidth = 600;
const canvasHeight = 600;
const cols = 60; // number of columns
const rows = 60; // number of rows
const w = canvasWidth / cols;
const h = canvasHeight / rows;
const density = 30;  // density of obstacle (0 ~ 100)

let grid = create2DArray(cols, rows);
let start = grid[0][0];  // top left
start.obstacle = false;
let end = grid[cols - 1][rows - 1]; // bottom right
end.obstacle = false;
let path = [];
let current;

let openSet = [start];
let closedSet = [];

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    console.log(grid);
}

function draw() {
    if (openSet.length > 0) { // Keep searching

	// Find the element in the openSet which has the lowest 'f' value
	let lowestI = 0;
	openSet.forEach((elem, i, arr) => {
	    if (elem.f < openSet[lowestI].f) lowestI = i;
	});
	
	current = openSet[lowestI];
	if (current === end) {
	    noLoop(); console.log('Done!');
	}

	removeFromArray(openSet, current);
	closedSet.push(current);

	current.neighbors.forEach((neighbor, i , arr) => {
	    if (closedSet.includes(neighbor)) return;
	    let tempCost = current.cost + 1;
	    if (!neighbor.obstacle) {
		let newPath = false;
		if (openSet.includes(neighbor)) {
		    if (tempCost < neighbor.cost) {
			neighbor.cost = tempCost;
			newPath = true;
		    }
		} else {
		    neighbor.cost = tempCost;
		    newPath = true;
		    openSet.push(neighbor);
		}

		if (newPath) {
		    neighbor.heuristic = calcHeuristic(neighbor, end);
		    neighbor.f = neighbor.cost + neighbor.heuristic;
		    neighbor.prev = current;
		}
	    }

	});
	
	
    } else { // No solution
	noLoop();
	console.log('Failed!');
	return;
    }
    
    background(255);

    // Display grid
    for (let i = 0; i < cols; i++) {
	for (let j = 0; j < rows; j++) {
	    grid[i][j].show(color(255));
	}
    }

    // Find the path
    path = [];
    let t = current;
    path.push(t);
    while(t.prev) {
	path.push(t.prev);
	t = t.prev;
    }
    
    // Display path
    noFill();
    stroke(0, 0, 255);
    strokeWeight(w / 2);
    beginShape();
    for (let i = 0; i < path.length; i++) {
	vertex(path[i].col * w + w / 2, path[i].row * h + h / 2);
    }  
    endShape();
}

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

function calcHeuristic(x, y) {
    return dist(x.col, x.row, y.col, y.row);
}
