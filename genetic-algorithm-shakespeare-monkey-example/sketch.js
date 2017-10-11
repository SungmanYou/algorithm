'use strict';


const mutation_rate = 0.01;
const total_population = 200;
const target_phrase = 'To be or not to be..';

let population;

function setup() {
    createCanvas(1200, 800);
    
    population = new Population({
	target_phrase: target_phrase,
	mutation_rate: mutation_rate,
	total_population: total_population
    });
}

function draw() {
    population.naturalSelection();

    population.generate();

    population.calcFitness();

    display();

    if (population.finished) {
	noLoop();
    }
}

function display() {
    background(255);

    textSize(24);
    text('Target Phrase', 20, 60);
    textSize(40);
    text(target_phrase, 20, 100);

    textSize(24);
    text('Best Phrase', 20, 160);

    textSize(40);
    let answer = population.getBest();
    text(answer, 20, 200);

    textSize(18);
    text("Total Generations   " + population.generation, 20, 300);
    text("Average Fitness   " + (population.getAverageFitness() * 100).toFixed(2) + "%", 20, 320);
    text("Total Population   " + total_population, 20, 340);
    text("Mutation Rate   " + mutation_rate * 100 + "%", 20, 360);
    
    textSize(10);
    text(population.getAllPhrases(), 480, 10);
}
