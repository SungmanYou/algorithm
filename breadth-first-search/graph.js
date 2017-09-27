'use strict';

function Graph() {
    this.nodes = [];
    this.graph = {};
    this.end = null;
    this.start = null;
}

Graph.prototype.addNode = function(node) {
    this.nodes.push(node);
    if (node.value.title) this.graph[node.value.title] = node;
    if (node.value.name) this.graph[node.value.name] = node;
};

Graph.prototype.getNode = function(person) {
    return this.graph[person.name];
};

Graph.prototype.setStart = function(name) {
    return this.start = this.graph[name];
};
Graph.prototype.setEnd = function(name) {
    return this.end = this.graph[name];
};
