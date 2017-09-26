var canvasWidth = 700;
var canvasHeight = 700;
var r = 20;

var cities = [];
var total = 6;
var recordDistance;
var bestEver;

function preload(){
    // This function will be called before setup
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    for (var i = 0; i < total; i++) {
	var v = createVector(random(canvasWidth), random(canvasHeight));
	cities[i] = v;
    }

    var d = calcDistance(cities);
    recordDistance = d;
    bestEver = cities.slice();
}

function draw() {
    background(31,31,31);

    var largestI = -1;
    for(var i = 0; i < cities.length; i++) {
	if (cities[i] < cities[i + 1]) {
	    largestI = i;
	}
    }

    if (largestI == -1) {
	noLoop();
	console.log("done");
    }

    var largestJ = -1;
    for(var j = 0; j < cities.length; j++) {
	if (cities[largestI] < cities[j]) {
	    largestJ = j;
	}
    }

    swap(cities, largestI, largestJ);

    var endArray = cities.splice(largestI + 1);
    endArray.reverse();
    cities = cities.concat(endArray);
    
    fill(255, 255, 255);
    for (var i = 0; i < cities.length; i++) {
	ellipse(cities[i].x, cities[i].y, r, r);
    }
    

    stroke(255, 0, 0);
    strokeWeight(2);
    noFill();
    beginShape();
    for(var i = 0; i < cities.length; i++) {
	vertex(cities[i].x, cities[i].y);
    }
    endShape();


    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    beginShape();
    for(var i = 0; i < bestEver.length; i++) {
	vertex(bestEver[i].x, bestEver[i].y);
    }
    endShape();

    var i = floor(random(cities.length));
    var j = floor(random(cities.length));
    swap(cities, i, j);

    var d = calcDistance(cities);
    if (d <recordDistance) {
	recordDistance = d;
	bestEver = cities.slice();
	console.log(recordDistance);
    }

    stroke(255,255, 255);
    strokeWeight(1);
    textSize(20);

    for(var i = 0; i < bestEver.length; i++) {
	text("X : " + bestEver[i].x.toFixed(3) + ", Y : " + bestEver[i].y.toFixed(3), 30, 30 + i * 20);
    }
}


function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function calcDistance(points) {
    var sum = 0;
    var d;
    for(var i = 0; i < points.length - 1; i++) {
	d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
	sum += d;
    }
    return sum;
}
