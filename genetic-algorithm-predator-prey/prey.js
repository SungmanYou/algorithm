'use strict';

const mutation_rate = 0.01;
const reproduce_rate = 0.01;

class Prey extends Unit {
    constructor() {
	super(); // inherit the common elements from the super class
	this.life = random(1, 5);
	this.size = random(1.5, 3.5);
	this.color = color(0, 0, 255);
	this.genes = {
	    food_weight: random(-2, 2),
	    food_range: random(15, 100),
	    poison_weight: random(-2, 2),
	    poison_range: random(15, 100),
	    mate_weight: random(-2, 2),
	    mate_range: random(15, 100),
	    predator_weight: random(-2, 2),
	    predator_range: random(15, 100)
	};
    }

    isDead() { 
	return this.life <= 0;
    }

    behaviors(fo, po, ma, pr) { // foods, poisons, mates, predators
	let food_steer_force = this.contact('food', fo, this.genes.food_range);
	let poison_steer_force = this.contact('poison', po, this.genes.poison_range);
	let mate_steer_force = this.contact('mate', ma, this.genes.mate_range);
	let predator_steer_force = this.contact('predator', pr, this.genes.predator_range);

	food_steer_force.mult(this.genes.food_weight);
	poison_steer_force.mult(this.genes.poison_weight);
	mate_steer_force.mult(this.genes.mate_weight);
	predator_steer_force.mult(this.genes.predator_weight);

	this.acceleration.add(food_steer_force);
	this.acceleration.add(poison_steer_force);
	this.acceleration.add(mate_steer_force);
	this.acceleration.add(predator_steer_force);
    }
    
    contact(type, arr, range) {
	let distance_record = Infinity;
	let closest_index = undefined;
	
	for (let i = arr.length - 1; i >= 0; i--) {
	    if (type === 'mate' && i === arr.indexOf(this)) {
		continue;
	    }
	    let d = this.position.dist(arr[i].position);
	    if (d < distance_record && d < range) {
		distance_record = d;
		closest_index = i;
	    }
	}
	
	if (closest_index) {
	    if (type === 'mate' && distance_record <= this.size + arr[closest_index].size && Math.random() < reproduce_rate) {
		let child = new Prey();
		child.position = createVector(this.position.x, this.position.y);
		child.genes = {
		    food_weight: (Math.random() < 0.5) ? this.genes.food_weight : arr[closest_index].genes.food_weight,
		    food_range: (Math.random() < 0.5) ? this.genes.food_range : arr[closest_index].genes.food_range,
		    poison_weight: (Math.random() < 0.5) ? this.genes.poison_weight : arr[closest_index].genes.poison_weight,
		    poison_range: (Math.random() < 0.5) ? this.genes.poison_weight : arr[closest_index].genes.poison_weight,
		    mate_weight: (Math.random() < 0.5) ? this.genes.mate_weight : arr[closest_index].genes.mate_weight,
		    mate_range: (Math.random() < 0.5) ? this.genes.mate_weight : arr[closest_index].genes.mate_weight,
		    predator_weight: (Math.random() < 0.5) ? this.genes.predator_weight : arr[closest_index].genes.predator_weight,
		    predator_range: (Math.random() < 0.5) ? this.genes.predator_weight : arr[closest_index].genes.predator_weight
		};
		if (Math.random() < mutation_rate) { // mutatation
		    child.genes = {
			food_weight: random(-2, 2),
			food_range: random(10, 100),
			poison_weight: random(-2, 2),
			poison_range: random(10, 100),
			mate_weight: random(-2, 2),
			mate_range: random(10, 100),
			predator_weight: random(-2, 2),
			predator_range: random(10, 100)
		    };
		}
		preys.push(child);
	    }
	    if (type === 'food' && distance_record < this.size) {
		this.life += arr[closest_index].score;
		arr.splice(closest_index, 1);
	    }
	    if (type === 'poison' && distance_record < this.size) {
		this.life += arr[closest_index].score;
		arr.splice(closest_index, 1);
	    }
	    
	    if (arr[closest_index]) {
		return this.calcForce(arr[closest_index].position);
	    }
	    return createVector(0, 0);
	}
	return createVector(0, 0);
    }

    display() {
	push();
	super.display();
	if (debug.checked()) {
	    // visualize the genes
	    noFill();
	    stroke(0, 255, 0);
	    line(0, 0, 0, -this.genes.food_weight * 50);
	    ellipse(0, 0, this.genes.food_range * 2);
	    stroke(255, 0, 0);
	    line(0, 0, 0, -this.genes.poison_weight * 50);
	    ellipse(0, 0, this.genes.poison_range * 2);
	    stroke(0, 0, 255);
	    line(0, 0, 0, -this.genes.mate_weight * 50);
	    ellipse(0, 0, this.genes.mate_range * 2);
	    stroke(255, 255, 0);
	    line(0, 0, 0, -this.genes.predator_weight * 50);
	    ellipse(0, 0, this.genes.predator_range * 2);
	}
	pop();
    }
}
