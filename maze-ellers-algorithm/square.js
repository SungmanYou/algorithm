'use strict';

function Square(params) {
    this.set = params.set;
    this.x = params.x;
    this.y = params.y;
    this.walls = {
	top: true,
	right: true,
	bottom: true,
	left: true
    };
}

Square.prototype.display = function() {
    let x = this.x * w;
    let y = this.y * h;

    stroke(255);
    if (this.set) {
	text(this.set, x + w / 2,y + h / 2);
    }
    
    if (this.walls.top)    line(x    , y    , x + w, y    ); // top
    if (this.walls.right)  line(x + w, y    , x + w, y + h); // right
    if (this.walls.bottom) line(x    , y + h, x + w, y + h); // bottom
    if (this.walls.left)   line(x    , y    , x    , y + h); // left
};
