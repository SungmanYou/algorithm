'use strict';

class Predator extends Unit {
    constructor() {
	super(); // inherit the common elements from the super class
	this.life = random(3, 5);
	this.size = random(4, 7);
	this.color = color(255, 255, 0);
	this.genes = {
	    poison_weight: random(-2, 2),
	    poison_range: random(10, 100),
	    prey_weight: random(-2, 2),
	    prey_range: random(10, 100)
	};
    }

    isDead() { 
	return this.life <= 0;
    }
    
    behaviors(po, pr) { // poisons, preys
	let poison_steer_force = this.contact('poison', po, this.genes.poison_range);
	let prey_steer_force = this.contact('prey', pr, this.genes.prey_range);

	poison_steer_force.mult(this.genes.poison_weight);
	prey_steer_force.mult(this.genes.prey_weight);
	
	this.acceleration.add(poison_steer_force);
	this.acceleration.add(prey_steer_force);
    }

    contact(type, arr, range) {
	let distance_record = Infinity;
	let closest_index = undefined;
	
	for (let i = arr.length - 1; i >= 0; i--) {
	    let d = this.position.dist(arr[i].position);
	    if (d < distance_record && d < range) {
		distance_record = d;
		closest_index = i;
	    }
	}

	if (closest_index) {
	    if (type === 'poison' && distance_record <= this.size) {
		// if the distance is close enough, update its life status and delete the element from the array
		this.life += arr[closest_index].score;
		arr.splice(closest_index, 1);
	    }

	    if (type === 'prey' && distance_record <= this.size + arr[closest_index].size) {
		this.life += arr[closest_index].life;
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
	    stroke(255, 0, 0);
	    line(0, 0, 0, -this.genes.poison_weight * 50);
	    ellipse(0, 0, this.genes.poison_range * 2);
	    stroke(0, 0, 255);
	    line(0, 0, 0, -this.genes.prey_weight * 50);
	    ellipse(0, 0, this.genes.prey_range * 2);
	}
	pop();
    }
}
