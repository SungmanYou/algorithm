'use strict';

const canvasWidth = 600;
const canvasHORIZONTALeight = 600;
const gridSize = 20;
const columns = canvasWidth / gridSize;
const rows = canvasHORIZONTALeight / gridSize;

const VERTICAL = 1, HORIZONTAL = 2;

function preload() {}

function setup() {
    createCanvas(canvasWidth + 1, canvasHORIZONTALeight + 1);
    noLoop();
    background(51);
    stroke(255);

    let minRow = 0;
    let maxRow = rows;
    let minCol = 0;
    let maxCol = columns;
    divide(minRow, minCol, maxRow, maxCol);
}

function divide(minRow, minCol, maxRow, maxCol) {

    let currentCol;
    let currentRow;
    let dir = getDirection(minRow, minCol, maxRow, maxCol);
    
    switch (dir) {
    case VERTICAL:
	currentCol = rand(minCol + 1, maxCol - 1);
	currentRow = rand(minRow, maxRow - 1);

	drawLine(currentCol, minRow, currentCol, currentRow);
	drawLine(currentCol, currentRow + 1, currentCol ,maxRow);
	
	divide(minRow, minCol, maxRow, currentCol);
	divide(minRow, currentCol, maxRow, maxCol);
	break;
    case HORIZONTAL:
	currentCol = rand(minCol, maxCol - 1);
	currentRow = rand(minRow + 1, maxRow - 1);

	drawLine(minCol, currentRow, currentCol, currentRow);
	drawLine(currentCol + 1, currentRow, maxCol, currentRow);
	
	divide(minRow, minCol, currentRow, maxCol);
	divide(currentRow, minCol, maxRow, maxCol);
	break;
    case 0:
	return;
    };
}

function getDirection(minRow, minCol, maxRow, maxCol) {
    let height = maxRow - minRow;
    let width = maxCol - minCol;
    
    if (height <= 1 || width <= 1)
	return 0;
    if (height < width)
	return VERTICAL;
    else
	return HORIZONTAL;
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawLine(c1, r1, c2, r2) {
    line(c1 * gridSize, r1 * gridSize, c2 * gridSize, r2 * gridSize);
}
