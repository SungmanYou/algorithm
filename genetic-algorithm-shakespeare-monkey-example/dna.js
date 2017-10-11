'use strict';


class DNA {
    constructor(num) {
	this.genes = new Array(num);
	this.fitness = 0;
	
	for (let i = 0; i < this.genes.length; i++) {
	    // initialize the each of genes with random pick of characters
	    this.genes[i] = String.fromCharCode(Math.floor(Math.random() * 97) + 32);
	}
    }
}

DNA.prototype.getPhrase = function() {
    return this.genes.join('');
};


DNA.prototype.calcFitness = function(target) {
    let score = 0;
    for (let i = 0; i < this.genes.length; i++) {
	if (this.genes[i] === target.charAt(i)) {
	    score++;
	}
    }
    this.fitness = score / target.length;
};


DNA.prototype.crossover = function(partner) {
    let child = new DNA(this.genes.length);
    let midpoint = Math.floor(Math.random() * this.genes.length);

    for (let i = 0; i < this.genes.length; i++) {
	if (i > midpoint) {
	    child.genes[i] = this.genes[i];
	} else {
	    child.genes[i] = partner.genes[i];
	}
    }
    return child;
};


DNA.prototype.mutate = function(mutation_rate) {
    for (let i = 0; i < this.genes.length; i++) {
	if (Math.random() < mutation_rate) {
	    this.genes[i] = String.fromCharCode(Math.floor(Math.random() * 97) + 32);
	}
    }
};
