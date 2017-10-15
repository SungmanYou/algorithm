'use strict';

const canvasWidth = 1200;
const canvasHeight = 600;

const food_update_rate = 0.3;
const poison_update_rate = 0.01;
const predator_update_rate = 0.001;

const total_preys = 100;
const total_predators = 5;
const total_foods = 200;
const total_poisons = 50;


let preys = [];
let foods = [];
let poisons = [];
let predators = [];

let debug;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    debug = createCheckbox('Visualize genes');
    for (let i = 0; i < total_preys; i++) {
	preys.push(new Prey());
    }
    for (let i = 0; i < total_predators; i++) {
	predators.push(new Predator());
    }
    for (let i = 0; i < total_foods; i++) {
	foods.push(new Item({ type: 'food', score: Math.random() }));
    }
    for (let i = 0; i < total_poisons; i++) {
	poisons.push(new Item({ type: 'poison', score: -Math.random() }));
    }
}

function draw() {
    background(51);

    // create new food randomly
    if (Math.random() < food_update_rate) {
	foods.push(new Item({ type: 'food', score: Math.random() }));
    }

    // create new poison randomly
    if (Math.random() < poison_update_rate) {
	poisons.push(new Item({ type: 'poison', score: -Math.random() }));
    }

    // foods
    for (let i = 0; i < foods.length; i++) {
	foods[i].display();
    }
    // poisons
    for (let i = 0; i < poisons.length; i++) {
	poisons[i].display();
    }

    // preys
    for (let i = preys.length - 1; i >= 0; i--) {
	if (preys[i].isDead()) { // this.life <= 0
	    preys.splice(i, 1);
	} else {
	    preys[i].boundaries();
	    preys[i].behaviors(foods, poisons, preys, predators);
	    preys[i].update();
	    preys[i].display();
	}
    }

    // predators
    for (let i = predators.length - 1; i >= 0; i--) {
	if (predators[i].isDead()) { // this.life <= 0
	    predators.splice(i, 1);
	} else {
	    predators[i].boundaries();
	    predators[i].behaviors(poisons, preys);
	    predators[i].update();
	    predators[i].display();
	}
    }

    // get best
    let best_prey = get_best_prey();
    let best_predator = get_best_predator();
    if (best_prey) {
	fill(255);
	textSize(15);
	text('BEST ' + best_prey.life.toFixed(1), best_prey.position.x, best_prey.position.y);
	// text('X ' + best_prey.position.x.toFixed(1), best_prey.position.x, best_prey.position.y + 20);
	// text('Y ' + best_prey.position.y.toFixed(1), best_prey.position.x, best_prey.position.y + 40);
    }
    if (best_predator) {
	fill(255);
	textSize(15);
	text('BEST ' + best_predator.life.toFixed(1), best_predator.position.x, best_predator.position.y);
	// text('X ' + best_predator.position.x.toFixed(1), best_predator.position.x, best_predator.position.y + 20);
	// text('Y ' + best_predator.position.y.toFixed(1), best_predator.position.x, best_predator.position.y + 40);
    }
}

function get_best_prey() {
    let best = 0;
    for (let i = 0; i < preys.length; i++) {
	if (preys[i].life > preys[best].life) {
	    best = i;
	}
    }
    return preys[best];
}

function get_best_predator() {
    let best = 0;
    for (let i = 0; i < predators.length; i++) {
	if (predators[i].life > predators[best].life) {
	    best = i;
	}
    }
    return predators[best];
}
