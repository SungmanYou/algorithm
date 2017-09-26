'use strict';

function Graph() {
    this.nodes = [];
    this.graph = {};
}

Graph.prototype.addNode = function(node) {
    // Node into array
    this.nodes.push(node);
    let group = node.value;

    // Node into "hash"
    this.graph[group] = node;
};

Graph.prototype.getNode = function(member) {
    let n = this.graph[member];
    return n;
};
