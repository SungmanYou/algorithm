'use strict';


class Item {
    constructor(params) {
	this.position = createVector(Math.random() * canvasWidth, Math.random() * canvasHeight);
	this.size = 4;
	// this.score = params.score;

	switch (params.type) {
	case 'food':
	    this.score = params.score;
	    this.color = color(0, 255, 0);
	    break;
	case 'poison':
	    this.score = params.score * 2;
	    this.color = color(255, 0, 0);
	    break;
	};
    }
}

Item.prototype.display = function() {
    fill(this.color);
    noStroke();
    ellipse(this.position.x, this.position.y, this.size, this.size);
};
