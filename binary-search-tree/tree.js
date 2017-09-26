'use strict';

function Tree() {
    this.root = null;
}

Tree.prototype.addValue = function(val) {
    (this.root === null) ? this.root = new Node(val) : this.root.addNode(new Node(val));
};

Tree.prototype.traverse = function() {
    this.root.visit();
};

Tree.prototype.search = function(val) {
    return this.root.search(val);
};

