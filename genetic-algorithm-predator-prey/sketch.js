'use strict';

const canvasWidth = 1000;
const canvasHeight = 600;

const food_update_rate = 0.1;
const poison_update_rate = 0.01;
const predator_update_rate = 0.001;

const total_preys = 15;
const total_foods = 15;
const total_poisons = 15;
const total_predators = 2;

let preys = [];
let foods = [];
let poisons = [];
let predators = [];

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    for (let i = 0; i < total_preys; i++) {
	preys.push(new Prey());
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
    for (let i = preys.length - 1; i >= 0; i--) { // iterate backwards to avoid the index issue in splicing an array
	if (preys[i].isDead()) { // this.life <= 0
	    preys.splice(i, 1);
	} else {
	    preys[i].boundaries();
	    preys[i].behaviors(foods, poisons, preys, predators);
	    preys[i].update();
	    preys[i].display();
	}
    }

    // get best
    let best_prey = get_best_prey();
    if (best_prey) {
	fill(255);
	textSize(20);
	text('LIFE : ' + best_prey.life.toFixed(1), best_prey.position.x, best_prey.position.y);
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
