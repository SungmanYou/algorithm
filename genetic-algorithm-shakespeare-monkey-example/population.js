'use strict';

class Population {
    constructor(params) {
	this.target_phrase = params.target_phrase;
	this.mutation_rate = params.mutation_rate;
	this.population = new Array(params.total_population);

	for (let i = 0; i < this.population.length; i++) {
	    this.population[i] = new DNA(this.target_phrase.length);
	}
	this.calcFitness();
	this.matingPool = new Array();
	this.finished = false;
	this.generation = 0;
	this.perfectScore = 1;
    }
}


Population.prototype.calcFitness = function() {
    for (let i = 0; i < this.population.length; i++) {
	this.population[i].calcFitness(this.target_phrase);
    }
};

Population.prototype.naturalSelection = function() {
    this.matingPool = [];

    let highestFitness = 0;
    for (let i = 0; i < this.population.length; i++) {
	if (this.population[i].fitness > highestFitness) {
	    highestFitness = this.population[i].fitness;
	}
    }
    for (let i = 0; i < this.population.length; i++) {
	let value = this.population[i].fitness;
	let min_1 = 0;
	let max_1 = highestFitness;
	let min_2 = 0;
	let max_2 = 1;
	let fitness = min_2 + (max_2 - min_2) * ((value - min_1) / (max_1 - min_1));

	let n = fitness * 100;
	for (let j = 0; j < n; j++) {
	    this.matingPool.push(this.population[i]);
	}
    }
};

Population.prototype.generate = function() {
    for (let i = 0; i < this.population.length; i++) {
	let a = Math.floor(Math.random() * this.matingPool.length);
	let b = Math.floor(Math.random() * this.matingPool.length);
	let partnerA = this.matingPool[a];
	let partnerB = this.matingPool[b];
	let child = partnerA.crossover(partnerB);
	child.mutate(this.mutation_rate);
	this.population[i] = child;
    }
    this.generation++;
};

Population.prototype.getBest = function() {
    let record = 0;
    let index = 0;
    for (let i = 0; i < this.population.length; i++) {
	if (this.population[i].fitness > record) {
	    index = i;
	    record = this.population[i].fitness;
	}
    }

    if (record === this.perfectScore) {
	this.finished = true;
    }
    return this.population[index].getPhrase();
};

Population.prototype.getAverageFitness = function() {
    let total = 0;
    for (let i = 0; i < this.population.length; i++) {
	total += this.population[i].fitness;
    }
    return total / this.population.length;
};

Population.prototype.getAllPhrases = function() {
    let str = '';
    for (let i = 0; i < this.population.length; i++) {
	str += ' [ ' + this.population[i].getPhrase() + ' ] ';
	if (i !== 0 && i % 5 === 0) {
	    str += '\n';
	}
    }
    return str;
};
