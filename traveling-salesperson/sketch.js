let canvasWidth = 600;
let canvasHeight = 600;
let r = 20;

let cities = [];
let total = 5;
let recordDistance;
let bestEver;

function preload(){
    // This function will be called before setup
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    for (let i = 0; i < total; i++) {
	cities.push(createVector(random(canvasWidth), random(canvasHeight)));
    }
    let d = calcDistance(cities);
    recordDistance = d;
    bestEver = cities.slice();
}

function draw() {
    background(31,31,31);

    let largestI = -1;
    for(let i = 0; i < cities.length; i++) {
	if (cities[i] < cities[i + 1]) {
	    largestI = i;
	}
    }

    if (largestI == -1) {
	noLoop();
	console.log("done");
    }

    let largestJ = -1;
    for(let j = 0; j < cities.length; j++) {
	if (cities[largestI] < cities[j]) {
	    largestJ = j;
	}
    }

    swap(cities, largestI, largestJ);

    let endArray = cities.splice(largestI + 1);
    endArray.reverse();
    cities = cities.concat(endArray);
    
    fill(255, 255, 255);
    for (let i = 0; i < cities.length; i++) {
	ellipse(cities[i].x, cities[i].y, r, r);
    }
    
    stroke(255, 0, 0);
    strokeWeight(2);
    noFill();
    beginShape();
    for(let i = 0; i < cities.length; i++) {
	vertex(cities[i].x, cities[i].y);
    }
    endShape();

    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    beginShape();
    for(let i = 0; i < bestEver.length; i++) {
	vertex(bestEver[i].x, bestEver[i].y);
    }
    endShape();

    let i = floor(random(cities.length));
    let j = floor(random(cities.length));
    swap(cities, i, j);

    let d = calcDistance(cities);
    if (d <recordDistance) {
	recordDistance = d;
	bestEver = cities.slice();
	console.log(recordDistance);
    }

    stroke(255,255, 255);
    strokeWeight(1);
    textSize(20);
    for(let i = 0; i < bestEver.length; i++) {
	text("X : " + bestEver[i].x.toFixed(3) + ", Y : " + bestEver[i].y.toFixed(3), 30, 30 + i * 20);
    }
}


function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function calcDistance(points) {
    let sum = 0;
    let d;
    for(let i = 0; i < points.length - 1; i++) {
	d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
	sum += d;
    }
    return sum;
}
