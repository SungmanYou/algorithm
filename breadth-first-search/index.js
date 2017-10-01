'use strict';

load()
    .then((MOVIE_DATA) => {
	return init(MOVIE_DATA);
    })
    .then((graph) => {
	let start = graph.setStart('Brad Pitt');
	let end = graph.setEnd('Kevin Bacon');
	console.log(`Start: ${start.value.name}`);
	console.log(`End: ${end.value.name}`);
	return search(start, end);
    })
    .then((result) => {
	showResult(result);
    });





function init(MOVIE_DATA) {
    return new Promise((resolve, reject) => {
	let graph = new Graph();
	MOVIE_DATA.forEach((movie, i, arr) => {
	    let movieNode = new Node({
		id: movie.id,
		title: movie.title,
		poster: movie.poster
	    });
	    graph.addNode(movieNode);
	    
	    movie.cast.forEach((person, j, arr) => {
		let personNode = graph.getNode(person);
		if (personNode === undefined) {
		    personNode = new Node({
			id: person.id,
			name: person.name,
			profile: person.profile
		    });
		}
		graph.addNode(personNode);
		movieNode.addEdge(personNode);
	    });
	});
	resolve(graph);
    });
}

function search(start, end) {
    return new Promise((resolve, reject) => {
	let queue = [];
	start.searched = true;
	queue.push(start);
	while (queue.length > 0) {
    	    let current = queue.shift();
	    if (current.value.name === end.value.name) {
		resolve(current);
		break;
    	    }
	    current.edges.forEach((neighbor, i, arr) => {
		if (!neighbor.searched) {
    		    neighbor.searched = true;
    		    neighbor.parent = current;
    		    queue.push(neighbor);
    		}
	    });
	}
    });
}

function showResult(result) {
    let path = [result];
    let next = result.parent;
    while (next !== null) {
	path.push(next);
	next = next.parent;
    }
    path = path.reverse();
    console.log(path);
}
