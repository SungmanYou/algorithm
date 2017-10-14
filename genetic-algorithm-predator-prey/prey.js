'use strict';

const mutation_rate = 0.001;
const reproduce_rate = 0.001;
const loss_per_frame = 0.01;
const edge_constraint = 5; // boundaries

class Prey {
    constructor() {
	this.acceleration = createVector(0, 0);
	this.velocity = createVector(0, -2);
	this.position = createVector(Math.random() * canvasWidth, Math.random() * canvasHeight);
	this.genes = {
	    food_weight: random(-2, 2),
	    food_range: random(5, 50),
	    poison_weight: random(-2, 2),
	    poison_range: random(5, 50),
	    mate_weight: random(-2, 2),
	    mate_range: random(50, 50),
	    predator_weight: random(-2, 2),
	    predator_range: random(5, 50)
	};
	
	this.life = random(1, 3);
	this.size = 2;
	this.max_speed = random(3, 5);
	this.max_force = random(0, 2);
    }

    isDead() { 
	return this.life <= 0;
    }

    update() {
	this.velocity.add(this.acceleration);
	this.velocity.limit(this.max_speed); // the velocity can't exceed its max_speed
	this.position.add(this.velocity); // update its position
	this.acceleration.mult(0); // reset the acceleration to 0 every cycle
	this.life -= loss_per_frame; // every time it updates, life will decrease	
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
    
    calcForce(target) {
	// vector pointing from the location to the target
	let desired = p5.Vector.sub(target, this.position);

	// scale the maximum speed
	desired.setMag(this.max_speed);

	// steer = desired minus velocity
	let steer = p5.Vector.sub(desired, this.velocity);
	steer.limit(this.max_force); // limit to maximum steering force
	return steer;
    }

    // a method that keep the vehicle inside of the canvas
    boundaries() {
	let desired = null;

	if (this.position.x < edge_constraint) {
	    desired = createVector(this.max_speed, this.velocity.y);
	} else if (this.position.x > canvasWidth - edge_constraint) {
	    desired = createVector(-this.max_speed, this.velocity.y);
	}

	if (this.position.y < edge_constraint) {
	    desired = createVector(this.velocity.x, this.max_speed);
	} else if (this.position.y > canvasHeight - edge_constraint) {
	    desired = createVector(this.velocity.x, -this.max_speed);
	}

	if (desired !== null) {
	    desired.normalize();
	    desired.mult(this.max_speed);
	    let steer = p5.Vector.sub(desired, this.velocity);
	    steer.limit(this.max_force);
	    this.acceleration.add(steer);
	    // this.acceleration.add(this.calcForce(steer));
	}
    }

    contact(type, arr, range) {
	let distance_record = Infinity;
	let closest_index = undefined;
	
	for (let i = arr.length - 1; i >= 0; i--) {
	    if (type === 'mate' && i === arr.indexOf(this)) { continue; }
	    let d = this.position.dist(arr[i].position);
	    if (d < distance_record && d < range) {
		distance_record = d;
		closest_index = i;
	    }
	}

	switch (type) {
	case 'mate':
	    if (distance_record < this.max_speed && Math.random() < reproduce_rate) {
		let child = new Prey();
		child.position = createVector(this.position.x, this.position.y);
		child.genes = JSON.parse(JSON.stringify(this.genes)); // copy the parent's genes
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
	    break;
	case 'predator':
	    if (distance_record < this.max_speed) {
		this.life = -1; // dead
	    }
	    break;
	default: // food || poison
	    if (distance_record < this.max_speed) {
		// if the distance is close enough, update its life status and delete the element from the array
		this.life += arr[closest_index].score;
		arr.splice(closest_index, 1);
	    }
	    break;
	};
	
	if (arr[closest_index]) {
	    return this.calcForce(arr[closest_index].position);
	} else {
	    return createVector(0, 0);
	}
    }

    display() {
	let angle = this.velocity.heading() + PI / 2;

	push();
	
	translate(this.position.x, this.position.y);
	rotate(angle);

	let c = lerpColor(color(255, 0, 0), color(0, 0, 255), this.life);
	fill(c);
	stroke(255);
	strokeWeight(0.5);
	
	beginShape();
	vertex(0, -this.size * 2);
	vertex(-this.size, this.size * 2);
	vertex(this.size, this.size * 2);
	endShape(CLOSE);

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
