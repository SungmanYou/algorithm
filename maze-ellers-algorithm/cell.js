'use strict';

function Cell(x, y) {
    this.set = null;
    this.x = x;
    this.y = y;
    this.right = true;
    this.bottom = true;
}

Cell.prototype.rand = function() {
    while (true) {
	let n = Math.floor(Math.random() * length * length) + 1;
	if (!sets.includes(n)) {
	    sets.push(n);
	    return n;
	}
    }
};

Cell.prototype.display = function() {
    let x = this.x * w;
    let y = this.y * h;
    
    stroke(255);
    if (this.right)  line(x + w, y    , x + w, y + h);
    if (this.bottom) line(x    , y + h, x + w, y + h);
};
