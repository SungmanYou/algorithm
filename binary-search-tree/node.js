'use strict';

function Node(val) {
    this.value = val;
    this.left = null;
    this.right = null;
}

Node.prototype.addNode = function(n) {
    switch (true) {
    case n.value < this.value:
	(this.left === null) ? this.left = n : this.left.addNode(n);
	break;
    case n.value > this.value:
	(this.right === null) ? this.right = n : this.right.addNode(n);
	break;
    };
};

Node.prototype.visit = function() {
    if (this.left !== null) {
	this.left.visit();
    }
    
    console.log(this.value);
    
    if (this.right !== null) {
	this.right.visit();
    }
};

Node.prototype.search = function(val) {
    if (this.value === val) {
	return this;
    }
    if (val < this.value && this.left !== null) {
	return this.left.search(val);
    }

    if (val > this.value && this.right !== null) {
	return this.right.search(val);
    }
    return null;
};
