'use strict';

const canvasWidth = 600;
const canvasHeight = 600;
const cols = 25;
const rows = 25;
const w = canvasWidth / cols;
const h = canvasHeight / rows;


let grid = create2DArray();
let selected;

function preload() {
    
    // initialize the grid and each of the Cell objects
    
    for (let j = 0; j < grid.length; j++) {
    	for (let i = 0; i < grid[j].length; i++) {
	    grid[j][i] = new Cell(i, j);
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

    // select the first cell
    let j = Math.floor(Math.random() * grid.length);
    let i = Math.floor(Math.random() * grid[j].length);
    grid[j][i].selected = true;
    selected = grid[j][i];
}


function draw() {
    
    if (done()) { console.log('done'); noLoop(); return; }

    // find all of the adjacent frontiers to the selected cell
    setFrontiers();

    // select random cell out of the frontiers
    // the global variable will set to the new selected cell
    selectRandomFrontier();

    // select random adjacent cell to the frontier which is selected above
    // carve the path between them
    carvePath();

    background(51);
    for (let j = 0; j < grid.length; j++) {
	for (let i = 0; i < grid[j].length; i++) {
	    grid[j][i].display();
	}
    }
}

function setFrontiers() {
    let neighbors = Object.values(selected.neighbors);
    for (let i = 0; i < neighbors.length; i++) {
	if (neighbors[i].frontier === false && neighbors[i].selected === false)
	    neighbors[i].frontier = true;
    }
}

function selectRandomFrontier() {
    while (true) {
	let j = Math.floor(Math.random() * grid.length);
	let i = Math.floor(Math.random() * grid[j].length);
	if (grid[j][i].frontier === true && grid[j][i].selected === false) {
	    selected = grid[j][i];
	    selected.selected = true;
	    selected.frontier = false;
	    break;
	}
    }
}

function carvePath() {
    let adjacent;
    let neighbors = Object.values(selected.neighbors);
    while (true) {
	let rand = Math.floor(Math.random() * neighbors.length);
	if (neighbors[rand].selected === true && neighbors[rand].frontier === false) {
	    adjacent = neighbors[rand];
	    break;
	}
    }
    
    if (adjacent.i === selected.i && adjacent.j > selected.j) {
    	adjacent.walls.top = false; selected.walls.bottom = false;
    }
    if (adjacent.i < selected.i && adjacent.j === selected.j) {
    	adjacent.walls.right = false; selected.walls.left = false;
    }
    if (adjacent.i === selected.i && adjacent.j < selected.j) {
    	adjacent.walls.bottom = false; selected.walls.top = false;
    }
    if (adjacent.i > selected.i && adjacent.j === selected.j) {
    	adjacent.walls.left = false; selected.walls.right = false;
    }
}

function done() {
    let count = 0;
    for (let j = 0; j < grid.length; j++) {
    	for (let i = 0; i < grid[j].length; i++) {
    	    if (!grid[j][i].selected) count++;
	}
    }
    if (count === 0) return true; 
    return false;
}

function create2DArray() {
    let arr = new Array(rows);
    for (let i = 0; i < arr.length; i++) {
	arr[i] = new Array(cols);
    }
    return arr;
}
