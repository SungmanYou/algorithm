'use strict';

const loss_per_frame = 0.005;
const edge_constraint = 5;

class Unit {
    constructor() {
	this.acceleration = createVector(0, 0);
	this.velocity = createVector(0, -2);
	this.position = createVector(Math.random() * canvasWidth, Math.random() * canvasHeight);
	this.max_speed = random(1, 5);
	this.max_force = random(0, 1);
    }
    
    update() {
	this.velocity.add(this.acceleration);
	this.velocity.limit(this.max_speed); // the velocity can't exceed its max_speed
	this.position.add(this.velocity); // update its position
	this.acceleration.mult(0); // reset the acceleration to 0 every cycle
	this.life -= loss_per_frame; // every time it updates, life will decrease	
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
	}
    }

    display() {
	let angle = this.velocity.heading() + PI / 2;
	translate(this.position.x, this.position.y);
	rotate(angle);
	let c = lerpColor(color(255, 0, 0), this.color, this.life);
	fill(c);
	stroke(255);
	strokeWeight(0.5);
	beginShape();
	vertex(0, -this.size * 2);
	vertex(-this.size, this.size * 2);
	vertex(this.size, this.size * 2);
	endShape(CLOSE);
    }
}
