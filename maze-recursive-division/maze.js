const N = 25;     // Grid dimension
const gridSize = 23; // Grid size

const VERTICAL = 1;
const HORIZONTAL = 2;

function setup() {
    createCanvas(N * gridSize + 1, N * gridSize + 1);
    noLoop();
    background(51);
    stroke(255);

    divide(0,0,N,N);    
}

function divide(minRow, minCol, maxRow, maxCol) {
    let col, row;
    let dir = getDirection(minRow, minCol, maxRow, maxCol);

    if (dir == VERTICAL) {
	
	// Calculate wall and opening locations
	col = rand(minCol + 1, maxCol - 1);
	row = rand(minRow, maxRow - 1);
	
	// Draw wall  
	gridLine(col, minRow, col, row);
	gridLine(col, row+1, col, maxRow);

	// Recursively divide two subfields
	divide(minRow, minCol, maxRow, col);
	divide(minRow, col, maxRow, maxCol);
    } else if (dir == HORIZONTAL) {
	
	// Calculate wall and opening locations
	col = rand(minCol, maxCol-1);
	row = rand(minRow+1, maxRow-1);
	
	// Draw wall  
	gridLine(minCol, row, col, row);
	gridLine(col+1, row, maxCol, row);
	
	// Recursively divide two subfields
	divide(minRow, minCol, row, maxCol);
	divide(row, minCol, maxRow, maxCol);
    } else {
	return;
    }
}

function getDirection(minRow, minCol, maxRow, maxCol) {
    let height = maxRow - minRow;
    let width = maxCol - minCol;
    
    if (height <= 1 || width <= 1)
	return 0; // too small
    if (height < width)
	return VERTICAL;
    else
	return HORIZONTAL;
}

// Return a random integer in the range [min, max]
function rand(min, max) {
    return round(random(min - 0.5, max + 0.5));
}

// Draw a line on a grid segment given grid points
function gridLine(minRow, minCol, maxRow, maxCol) {
    line(minRow * gridSize, minCol * gridSize, maxRow * gridSize, maxCol * gridSize);
}
