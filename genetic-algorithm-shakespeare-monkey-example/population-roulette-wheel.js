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

Population.prototype.randomPick = function(sum) {
    let rand = Math.random() * sum;
    let index = 0;
    while (rand < sum) {
	rand += this.population[index].fitness;
	index++;
    }
    index--;
    return this.population[index];
};


Population.prototype.createNextGeneration = function() {

    let new_population = [];

    // calculate total_fitness of fitnesses
    let total_fitness = 0;
    for (let i = 0; i < this.population.length; i++) {
	total_fitness += this.population[i].fitness;
    }
    
    for (let i = 0; i < this.population.length; i++) {
	let parent_a = this.randomPick(total_fitness);
	let parent_b = this.randomPick(total_fitness);
	let child = parent_a.crossover(parent_b);
	child.mutate(this.mutation_rate);
	new_population.push(child);
    }
    
    this.population = new_population;
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
